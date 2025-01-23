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
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 96)  # Further increased font size for better visibility
    except:
        font = ImageFont.load_default()
    
    # Calculate text size and position
    img_w, img_h = img.size
    
    # Wrap text
    margin = 20
    max_width = int(img_w * 0.8)  # Use 80% of image width
    
    # Get average character width using textbbox
    test_text = 'x' * 10
    test_bbox = draw.textbbox((0, 0), test_text, font=font)
    avg_char_width = (test_bbox[2] - test_bbox[0]) / 10
    
    # Calculate maximum characters per line
    max_chars_per_line = int(max_width / avg_char_width)
    wrapped_text = textwrap.fill(text, width=max_chars_per_line)
    
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
    # Create output directory
    os.makedirs("public/images", exist_ok=True)
    
    # Define memes with their source images and text
    memes = [
        {
            'url': 'https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2',  # Cat with glasses looking wise
            'output': 'cat-title.jpg',
            'text': 'What LLMs Can Do - Explained by Cats'
        },
        {
            'url': 'https://images.unsplash.com/photo-1573865526739-10659fec78a5',  # Cat meowing/talking actively
            'output': 'cat-chat-general.jpg',
            'text': 'I can chat about anything! From math problems to life advice'
        },
        {
            'url': 'https://images.unsplash.com/photo-1442291928580-fb5d0856a8f1',  # Thoughtful cat looking up
            'output': 'cat-chat-qa.jpg',
            'text': 'Ask me anything - math, puzzles, or if you should eat that cheese'
        },
        {
            'url': 'https://images.unsplash.com/photo-1511044568932-338cba0ad803',  # Cat with headphones
            'output': 'cat-chat-audio.jpg',
            'text': "Let's have a real-time voice chat!"
        },
        {
            'url': 'https://images.unsplash.com/photo-1494256997604-768d1f608cac',  # Cat looking at screen
            'output': 'cat-chat-video.jpg',
            'text': "Face-to-face conversations? I'm ready!"
        },
        {
            'url': 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8',  # Cat typing on keyboard
            'output': 'cat-coding-general.jpg',
            'text': 'I help you code better! Your AI programming buddy'
        },
        {
            'url': 'https://images.unsplash.com/photo-1507146426996-ef05306b995a',  # Cat suggesting/pointing
            'output': 'cat-coding-completion.jpg',
            'text': 'Let me finish that line of code for you...'
        },
        {
            'url': 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8',  # Cat reviewing screen intently
            'output': 'cat-coding-review.jpg',
            'text': 'Your code looks purr-fect, but here\'s a suggestion'
        },
        {
            'url': 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee',  # Cat with paper/checklist
            'output': 'cat-coding-task.jpg',
            'text': "I'll handle this coding task for you"
        },
        {
            'url': 'https://images.unsplash.com/photo-1574158622682-e40e69881006',  # Cat near microphone/speaking
            'output': 'cat-transcribe.jpg',
            'text': "I'll convert your speech to text with high accuracy"
        },
        {
            'url': 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13',  # Cat with artistic setup
            'output': 'cat-image-gen.jpg',
            'text': "Tell me what to draw! I'll create it for you"
        },
        {
            'url': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',  # Cat with curious/searching look
            'output': 'cat-search.jpg',
            'text': "I'll find exactly what you're looking for"
        },
    ]
    
    # Create each meme
    for meme in memes:
        print(f"Creating meme: {meme['output']}")
        try:
            # Download and create meme
            img = download_image(meme['url'])
            output_path = os.path.join("public/images", meme['output'])
            create_meme(img, meme['text'], output_path)
            print(f"Created: {meme['output']}")
        except Exception as e:
            print(f"Error creating {meme['output']}: {str(e)}")

if __name__ == "__main__":
    main()
