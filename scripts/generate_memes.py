import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

def add_text_to_image(image_path, output_path, text, font_size=40):
    # Open image
    img = Image.open(image_path)
    
    # Create drawing context
    draw = ImageDraw.Draw(img)
    
    # Load a font (using default system font)
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        font = ImageFont.load_default()
    
    # Calculate text position (centered)
    img_w, img_h = img.size
    
    # Wrap text
    avg_char_width = sum(font.getsize(char)[0] for char in 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') / 52
    max_chars = int((img_w * 0.9) / avg_char_width)
    wrapped_text = textwrap.fill(text, width=max_chars)
    
    # Get text size
    text_bbox = draw.textbbox((0, 0), wrapped_text, font=font)
    text_w = text_bbox[2] - text_bbox[0]
    text_h = text_bbox[3] - text_bbox[1]
    
    # Calculate position for text (centered, bottom with padding)
    x = (img_w - text_w) / 2
    y = img_h - text_h - 20  # 20px padding from bottom
    
    # Add white background for text
    padding = 10
    draw.rectangle([x - padding, y - padding, x + text_w + padding, y + text_h + padding], fill='white', outline='black')
    
    # Draw text
    draw.text((x, y), wrapped_text, font=font, fill='black')
    
    # Save the image
    img.save(output_path)

def main():
    # Create output directory if it doesn't exist
    os.makedirs("public/images/new", exist_ok=True)
    
    # Define meme texts
    memes = [
        ("cat-title.jpg", "What LLMs Can Do - Explained by Cats"),
        ("cat-chat-general.jpg", "I can chat about anything! From math problems to life advice"),
        ("cat-chat-qa.jpg", "Ask me anything - math, puzzles, or if you should eat that cheese"),
        ("cat-chat-audio.jpg", "Let's have a real-time voice chat!"),
        ("cat-chat-video.jpg", "Face-to-face conversations? I'm ready!"),
        ("cat-coding-general.jpg", "I help you code better! Your AI programming buddy"),
        ("cat-coding-completion.jpg", "Let me finish that line of code for you..."),
        ("cat-coding-review.jpg", "Your code looks purr-fect, but here's a suggestion"),
        ("cat-coding-task.jpg", "I'll handle this coding task for you"),
        ("cat-transcribe.jpg", "I'll convert your speech to text with high accuracy"),
        ("cat-image-gen.jpg", "Tell me what to draw! I'll create it for you"),
        ("cat-search.jpg", "I'll find exactly what you're looking for")
    ]
    
    # Process each meme
    for filename, text in memes:
        input_path = f"public/images/{filename}"
        output_path = f"public/images/new/{filename}"
        
        if os.path.exists(input_path):
            print(f"Processing {filename}...")
            add_text_to_image(input_path, output_path, text)
        else:
            print(f"Warning: {input_path} not found")

if __name__ == "__main__":
    main()
