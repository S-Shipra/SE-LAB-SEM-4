import streamlit as st
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib
import os

st.set_page_config(page_title="Disorder Predictor", page_icon="🧠", layout="wide")

# --- Load and Train Model ---
@st.cache_resource
def train_model():
    df = pd.read_csv("dataset.csv")  # Make sure dataset.csv is in the same folder

    # Features (convert yes/no to 1/0)
    X = df.iloc[:, :-1].applymap(lambda x: 1 if x.lower() == 'yes' else 0)

    # Target (label encode)
    le = LabelEncoder()
    y = le.fit_transform(df.iloc[:, -1])

    # Train model
    clf = RandomForestClassifier(random_state=42)
    clf.fit(X, y)

    # Save model and encoder
    joblib.dump(clf, "model.pkl")
    joblib.dump(le, "label_encoder.pkl")
    X.columns.to_series().to_csv("features.txt", index=False, header=False)

    return clf, le, list(X.columns)

# Load or train
if os.path.exists("model.pkl") and os.path.exists("label_encoder.pkl") and os.path.exists("features.txt"):
    clf = joblib.load("model.pkl")
    le = joblib.load("label_encoder.pkl")
    with open("features.txt", "r") as f:
        feature_names = [line.strip() for line in f.readlines()]
else:
    clf, le, feature_names = train_model()

# --- Custom CSS ---
st.markdown("""
    <style>
        * { color: black !important; }
        div.stButton > button {
            background-color: white !important;
            color: black !important;
            border: 1px solid #ccc !important;
        }
        body {
            background-color: #E6F0FA;
        }
        .stApp {
            background-color: #E6F0FA;
        }
        .block-container {
            padding-top: 2rem;
            padding-bottom: 2rem;
        }
        .question-block {
            background-color: #ffffff;
            border-radius: 12px;
            padding: 12px;
            margin: 6px;
            box-shadow: 0px 2px 5px rgba(0,0,0,0.1);
            color: #000000;
            font-size: 16px;
            text-align: center;
        }
        .stSlider > div {
            justify-content: center;
        }
    </style>
""", unsafe_allow_html=True)

# --- Streamlit Interface ---
st.title("🧠 Mental Health Disorder Predictor")
st.markdown("""
### Rate each question from **1 to 10** based on how strongly you feel about each:
""")

user_input = []

# 4 questions per row, total 6 rows for 24 questions
for i in range(0, len(feature_names), 4):
    cols = st.columns(4)
    for j in range(4):
        if i + j < len(feature_names):
            with cols[j]:
                with st.container():
                    st.markdown(
                        f"<div class='question-block'><strong>{feature_names[i + j]}❓ </strong></div>",
                        unsafe_allow_html=True
                    )
                    response = st.slider(
                        "",  # <<< No label here
                        min_value=0,
                        max_value=10,
                        value=5,
                        key=feature_names[i + j],
                    )
                    user_input.append(1 if response >= 6 else 0)

# --- Prediction ---
if st.button("Predict Disorder"):
    prediction = clf.predict([user_input])[0]
    disorder = le.inverse_transform([prediction])[0]
    st.success(f"🧾 Predicted Disorder: **{disorder}**")

    st.subheader("Prediction Confidence:")
    probs = clf.predict_proba([user_input])[0]
    for cls, prob in zip(le.classes_, probs):
        st.write(f"{cls}: {prob:.2%}")
