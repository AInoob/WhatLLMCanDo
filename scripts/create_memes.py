import os
from PIL import Image, ImageDraw, ImageFont
import textwrap
import requests
from io import BytesIO

def download_image(url, save_path=None):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    img = Image.open(BytesIO(response.content))
    if save_path:
        img.save(save_path)
    return img

def create_meme(image, text, output_path):
    # Create a copy of the image
    img = image.copy()
    
    # Create drawing context
    draw = ImageDraw.Draw(img)
    
    # Load font (using system font)
    try:
        # Use Noto Sans CJK for better Chinese character support
        font = ImageFont.truetype("/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc", 96)
    except:
        try:
            # Fallback to DejaVu Sans if Noto is not available
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 96)
        except:
            font = ImageFont.load_default()
    
    # Calculate text size and position
    img_w, img_h = img.size
    
    # Wrap text
    margin = 20
    max_width = int(img_w * 0.8)  # Use 80% of image width
    
    # Calculate text wrapping based on actual text width
    def get_text_width(text):
        bbox = draw.textbbox((0, 0), text, font=font)
        return bbox[2] - bbox[0]
    
    # Wrap text by measuring actual width
    words = text.split()
    lines = []
    current_line = words[0]
    
    for word in words[1:]:
        test_line = current_line + ' ' + word
        if get_text_width(test_line) <= max_width:
            current_line = test_line
        else:
            lines.append(current_line)
            current_line = word
    
    lines.append(current_line)
    wrapped_text = '\n'.join(lines)
    
    # Get text size
    text_bbox = draw.textbbox((0, 0), wrapped_text, font=font)
    text_w = text_bbox[2] - text_bbox[0]
    text_h = text_bbox[3] - text_bbox[1]
    
    # Calculate text position (centered, higher from bottom for better visibility with larger text)
    x = (img_w - text_w) // 2
    y = img_h - text_h - margin * 6  # Further increased margin from bottom for larger text
    
    # Draw white background with black outline
    padding = 10
    draw.rectangle(
        [x - padding, y - padding, x + text_w + padding, y + text_h + padding],
        fill='white',
        outline='black',
        width=2
    )
    
    # Draw text
    draw.text((x, y), wrapped_text, font=font, fill='black')
    
    # Save the meme
    img.save(output_path)

def main():
    # Create output directories for each language
    os.makedirs("public/images/en", exist_ok=True)
    os.makedirs("public/images/zh", exist_ok=True)
    
    # Define memes with their source images and text in both languages
    memes = [
        {
            'url': 'https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2',  # Cat with glasses looking wise
            'output': 'cat-title.jpg',
            'text': {
                'en': 'What LLMs Can Do - Explained by Cats',
                'zh': '大语言模型能做什么 - 猫咪图解'
            }
        },
        {
            'url': 'https://images.unsplash.com/photo-1573865526739-10659fec78a5',  # Cat meowing/talking actively
            'output': 'cat-chat-general.jpg',
            'text': {
                'en': 'I can chat about anything! From math problems to life advice',
                'zh': '我可以聊任何话题！从数学问题到生活建议'
            }
        },
        {
            'url': 'https://images.unsplash.com/photo-1442291928580-fb5d0856a8f1',  # Thoughtful cat looking up
            'output': 'cat-chat-qa.jpg',
            'text': {
                'en': 'Ask me anything - math, puzzles, or if you should eat that cheese',
                'zh': '问我任何问题 - 数学、谜题，或是要不要吃那块奶酪'
            }
        },
        {
            'url': 'https://images.unsplash.com/photo-1511044568932-338cba0ad803',  # Cat with headphones
            'output': 'cat-chat-audio.jpg',
            'text': {
                'en': "Let's have a real-time voice chat!",
                'zh': "让我们来场实时语音聊天吧！"
            }
        },
        {
            'url': 'https://images.unsplash.com/photo-1494256997604-768d1f608cac',  # Cat looking at screen
            'output': 'cat-chat-video.jpg',
            'text': {
                'en': "Face-to-face conversations? I'm ready!",
                'zh': "想来场面对面的对话吗？我准备好了！"
            }
        },
        {
            'url': 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8',  # Cat typing on keyboard
            'output': 'cat-coding-general.jpg',
            'text': {
                'en': 'I help you code better! Your AI programming buddy',
                'zh': '我来帮你写更好的代码！你的AI编程伙伴'
            }
        },
        {
            'url': 'https://images.unsplash.com/photo-1507146426996-ef05306b995a',  # Cat suggesting/pointing
            'output': 'cat-coding-completion.jpg',
            'text': {
                'en': 'Let me finish that line of code for you...',
                'zh': '让我来帮你完成这行代码...'
            }
        },
        {
            'url': 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8',  # Cat reviewing screen intently
            'output': 'cat-coding-review.jpg',
            'text': {
                'en': 'Your code looks purr-fect, but here\'s a suggestion',
                'zh': '你的代码看起来很完美，不过这里有个建议'
            }
        },
        {
            'url': 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee',  # Cat with paper/checklist
            'output': 'cat-coding-task.jpg',
            'text': {
                'en': "I'll handle this coding task for you",
                'zh': "这个编程任务交给我来处理"
            }
        },
        {
            'url': 'https://images.unsplash.com/photo-1574158622682-e40e69881006',  # Cat near microphone/speaking
            'output': 'cat-transcribe.jpg',
            'text': {
                'en': "I'll convert your speech to text with high accuracy",
                'zh': "我可以高精度地将你的语音转换成文字"
            }
        },
        {
            'url': 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13',  # Cat with artistic setup
            'output': 'cat-image-gen.jpg',
            'text': {
                'en': "Tell me what to draw! I'll create it for you",
                'zh': "告诉我你想画什么！我来为你创作"
            }
        },
        {
            'url': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',  # Cat with curious/searching look
            'output': 'cat-search.jpg',
            'text': {
                'en': "I'll find exactly what you're looking for",
                'zh': "我会帮你找到你想要的任何东西"
            }
        },
    ]
    
    # Create each meme
    for meme in memes:
        print(f"Creating meme: {meme['output']}")
        try:
            # Download and create meme
            img = download_image(meme['url'])
            # Create memes for both languages
            for lang in ['en', 'zh']:
                output_path = os.path.join(f"public/images/{lang}", meme['output'])
                create_meme(img, meme['text'][lang], output_path)
            print(f"Created: {meme['output']}")
        except Exception as e:
            print(f"Error creating {meme['output']}: {str(e)}")

if __name__ == "__main__":
    main()
