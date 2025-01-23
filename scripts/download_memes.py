import os
import requests
from urllib.parse import urlparse

def download_image(url, filename):
    response = requests.get(url)
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            f.write(response.content)
        print(f"Downloaded {filename}")
    else:
        print(f"Failed to download {url}")

# Create images directory if it doesn't exist
os.makedirs("public/images", exist_ok=True)

# List of meme URLs and their corresponding filenames
memes = [
    # Chat section
    ("https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif", "cat-chat-general.jpg"),
    ("https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif", "cat-chat-qa.jpg"),
    ("https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif", "cat-chat-audio.jpg"),
    ("https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif", "cat-chat-video.jpg"),
    
    # Coding section
    ("https://media.giphy.com/media/ule4vhcY1xEKQ/giphy.gif", "cat-coding-general.jpg"),
    ("https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif", "cat-coding-completion.jpg"),
    ("https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif", "cat-coding-review.jpg"),
    ("https://media.giphy.com/media/13UZisxBxkjPwI/giphy.gif", "cat-coding-task.jpg"),
    
    # Other sections
    ("https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif", "cat-transcribe.jpg"),
    ("https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif", "cat-image-gen.jpg"),
    ("https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif", "cat-search.jpg")
]

for url, filename in memes:
    download_image(url, os.path.join("public/images", filename))
