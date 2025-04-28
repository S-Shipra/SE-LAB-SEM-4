import streamlit as st
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib
import numpy as np

# --- Load or Train the Model ---
def load_or_train_model():
    try:
        # Try to load existing model, vectorizer, and label encoder
        clf = joblib.load("text_model.pkl")
        vectorizer = joblib.load("vectorizer.pkl")
        le = joblib.load("label_encoder.pkl")
        return clf, vectorizer, le
    except:
        # If model does not exist, train a new one
        df = pd.read_csv("sentiment_dataset.csv")
        df = df.dropna(subset=["statement", "status"])
        
        # Encode target labels
        le = LabelEncoder()
        df['status_encoded'] = le.fit_transform(df['status'])
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            df['statement'], df['status_encoded'], test_size=0.2, random_state=42
        )
        
        # TF-IDF vectorization
        vectorizer = TfidfVectorizer(max_features=3000, stop_words='english')
        X_train_vec = vectorizer.fit_transform(X_train)
        X_test_vec = vectorizer.transform(X_test)
        
        # Train the model
        clf = RandomForestClassifier()
        clf.fit(X_train_vec, y_train)
        
        # Save model and components
        joblib.dump(clf, "text_model.pkl")
        joblib.dump(vectorizer, "vectorizer.pkl")
        joblib.dump(le, "label_encoder.pkl")
        
        return clf, vectorizer, le

# Load trained model and components
clf, vectorizer, le = load_or_train_model()

# --- Streamlit Interface ---
st.set_page_config(page_title="Mental Health Disorder Predictor", page_icon="🧠")

# Set background color and layout
st.markdown(
    """
    <style>
        body {
            background-color: #38508a;
        }
        .stApp {
            background-color: #38508a;
        }
        .stButton button {
            background-color: #819bdb;
            color: white;
        }
        .stTextInput, .stButton {
            font-size: 20px;
        }
    </style>
    """, unsafe_allow_html=True
)

# Title of the app
st.title("🧠 Mental Health Disorder Predictor")

# Textbox for user input
user_input = st.text_area("Enter a statement about your mental health:", height=150)

# Prediction button
if st.button("Predict Disorder"):
    if user_input:
        # Process the input and predict
        user_vec = vectorizer.transform([user_input])
        pred = clf.predict(user_vec)[0]
        predicted_disorder = le.inverse_transform([pred])[0]

        # Display the prediction result
        st.success(f"🧾 Predicted Disorder: **{predicted_disorder}**")
        
        # Display confidence scores for all possible disorders
        probs = clf.predict_proba(user_vec)[0]
        st.subheader("Confidence Scores for All Disorders:")
        for disorder, prob in zip(le.classes_, probs):
            st.write(f"{disorder}: {prob * 100:.2f}%")

    else:
        st.error("Please enter a statement before predicting.")
