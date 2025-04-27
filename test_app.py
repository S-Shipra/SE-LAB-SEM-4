import unittest
from textblob import TextBlob
from app import app, GUARDIAN_API_URL
import requests

class TestMentalHealthApp(unittest.TestCase):

    def setUp(self):
        # Setup test client
        self.app = app.test_client()
        self.app.testing = True

    def test_home_route_status_code(self):
        """Test if home page (/) loads successfully"""
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)

    def test_sentiment_analysis_positive(self):
        """Test sentiment analysis for a positive sentence"""
        text = "I feel fantastic and very happy today!"
        score = TextBlob(text.lower()).sentiment.polarity

        if score > 0.6:
            expected_sentiment = "Highly Positive"
        elif score > 0:
            expected_sentiment = "Positive"
        elif score == 0:
            expected_sentiment = "Neutral"
        elif score >= -0.6:
            expected_sentiment = "Negative"
        else:
            expected_sentiment = "Highly Negative"

        self.assertEqual(expected_sentiment, "Highly Positive")

    def test_guardian_api_fetch(self):
        """Test if Guardian API fetches data successfully"""
        response = requests.get(GUARDIAN_API_URL)
        self.assertEqual(response.status_code, 200)

        data = response.json()
        results = data.get("response", {}).get("results", [])
        self.assertIsInstance(results, list)
        # Optional: Check that results are not empty
        self.assertGreaterEqual(len(results), 1)

if __name__ == "__main__":
    unittest.main()
