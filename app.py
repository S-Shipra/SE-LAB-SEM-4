from flask import Flask, render_template
import requests
from textblob import TextBlob

app = Flask(__name__)

API_KEY = "67c8b6ff-6ee7-483b-8904-bdf993afbc50"
GUARDIAN_API_URL = f"https://content.guardianapis.com/search?q=mental+health&api-key={API_KEY}&show-fields=thumbnail,bodyText"

# Emotion keyword sets
emotion_sets = {
    "Anxiety": {
        "nervous", "anxious", "panic", "stressed", "worried",
        "overwhelmed", "uneasy", "restless", "tense"
    },
    "Depression": {
        "sad", "hopeless", "tired", "depressed", "miserable",
        "worthless", "empty", "numb", "down"
    },
    "Anger": {
        "angry", "frustrated", "irritated", "furious", "rage",
        "annoyed", "mad", "resentful", "outraged"
    },
    "Fear": {
        "afraid", "scared", "terrified", "frightened", "petrified",
        "worried", "alarmed", "dread", "shaken"
    },
    "Loneliness": {
        "lonely", "isolated", "abandoned", "unloved", "ignored",
        "rejected", "forsaken", "left out", "friendless"
    }
}

@app.route("/")
def index():
    response = requests.get(GUARDIAN_API_URL)
    data = response.json()
    articles = data.get("response", {}).get("results", [])

    processed_articles = []

    for article in articles[:25]:  # Show 15 articles
        title = article["webTitle"]
        url = article["webUrl"]
        image = article["fields"].get("thumbnail", "")
        content = article["fields"].get("bodyText", "")[:500]  # Short preview

        # Sentiment Analysis
        text = content.lower()
        sentiment_score = TextBlob(text).sentiment.polarity

        sentiment_label = (
            "Highly Positive" if sentiment_score > 0.6 else
            "Positive" if sentiment_score > 0 else
            "Neutral" if sentiment_score == 0 else
            "Negative" if sentiment_score >= -0.6 else
            "Highly Negative"
        )

        # Emotion Detection
        emotion_label = []
        for emotion, keywords in emotion_sets.items():
            if any(word in text for word in keywords):
                emotion_label.append(emotion)

        processed_articles.append({
            "title": title,
            "url": url,
            "image": image,
            "content": content,
            "sentiment": sentiment_label,
            "emotions": ", ".join(emotion_label) if emotion_label else "None",
            "score": round(sentiment_score, 2)
        })

    return render_template("index.html", articles=processed_articles)

if __name__ == "__main__":
    app.run(debug=True)
