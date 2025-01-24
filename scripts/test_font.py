import os
from PIL import ImageFont, Image, ImageDraw

def test_chinese_font():
    # First install the font if not present
    if not os.path.exists('/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'):
        os.system('sudo apt-get update && sudo apt-get install -y fonts-noto-cjk')
    
    # Create a test image
    img = Image.new('RGB', (500, 200), color='white')
    draw = ImageDraw.Draw(img)
    
    # Test with Chinese text
    test_text = "大语言模型能做什么"
    try:
        font = ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc', 48)
        bbox = draw.textbbox((0, 0), test_text, font=font)
        width = bbox[2] - bbox[0]
        height = bbox[3] - bbox[1]
        print(f"Successfully loaded CJK font. Text dimensions: {width}x{height}px")
        return True
    except Exception as e:
        print(f"Error loading font: {str(e)}")
        return False

if __name__ == "__main__":
    test_chinese_font()
