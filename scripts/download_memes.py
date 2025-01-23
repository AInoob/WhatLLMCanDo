import os
import requests
from urllib.parse import urlparse

def download_image(url, filename):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        with open(filename, 'wb') as f:
            f.write(response.content)
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Failed to download {url}: {str(e)}")

# Create images directory if it doesn't exist
os.makedirs("public/images", exist_ok=True)

# List of meme URLs and their corresponding filenames
memes = [
    # Title and main sections
    ("https://raw.githubusercontent.com/AInoob/WhatLLMCanDo/main/public/images/cat-title.jpg", "cat-title.jpg"),  # Wise cat with glasses
    ("https://raw.githubusercontent.com/AInoob/WhatLLMCanDo/main/public/images/cat-chat-general.jpg", "cat-chat-general.jpg"),  # Cat talking/meowing
    ("https://raw.githubusercontent.com/AInoob/WhatLLMCanDo/main/public/images/cat-chat-qa.jpg", "cat-chat-qa.jpg"),  # Thinking cat
    ("https://raw.githubusercontent.com/AInoob/WhatLLMCanDo/main/public/images/cat-chat-audio.jpg", "cat-chat-audio.jpg"),  # Cat with headphones
    ("https://raw.githubusercontent.com/AInoob/WhatLLMCanDo/main/public/images/cat-chat-video.jpg", "cat-chat-video.jpg"),  # Cat looking at screen
    
    # Coding section
    ("https://raw.githubusercontent.com/AInoob/WhatLLMCanDo/main/public/images/cat-coding-general.jpg", "cat-coding-general.jpg"),  # Cat at computer
    ("https://raw.githubusercontent.com/AInoob/WhatLLMCanDo/main/public/images/cat-coding-completion.jpg", "cat-coding-completion.jpg"),  # Cat typing
    ("https://raw.githubusercontent.com/AInoob/WhatLLMCanDo/main/public/images/cat-coding-review.jpg", "cat-coding-review.jpg"),  # Cat with glasses looking at screen
    ("https://raw.githubusercontent.com/AInoob/WhatLLMCanDo/main/public/images/cat-coding-task.jpg", "cat-coding-task.jpg"),  # Cat with checklist
    
    # Other sections
    ("https://raw.githubusercontent.com/AInoob/WhatLLMCanDo/main/public/images/cat-transcribe.jpg", "cat-transcribe.jpg"),  # Cat with microphone
    ("https://raw.githubusercontent.com/AInoob/WhatLLMCanDo/main/public/images/cat-image-gen.jpg", "cat-image-gen.jpg"),  # Cat painting/drawing
    ("https://raw.githubusercontent.com/AInoob/WhatLLMCanDo/main/public/images/cat-search.jpg", "cat-search.jpg")  # Cat with magnifying glass
]

for url, filename in memes:
    download_image(url, os.path.join("public/images", filename))
