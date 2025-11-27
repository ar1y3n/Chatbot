# Chatbot
💬 Sentiment Chatbot: Gemini-Powered Conversation Analysis
This is a full-stack Flask application that utilizes Google's Gemini API for generating context-aware chat responses and performing real-time, message-level sentiment analysis, as well as a comprehensive analysis of the entire conversation trend.

It features a modern two-panel UI with a history sidebar and dynamic visual feedback, including a typing indicator and color-coded sentiment tags.

✨ Features
Gemini Integration: Uses the gemini-flash-latest model for chat generation and advanced sentiment analysis.

Real-time Sentiment: Analyzes the user's message sentiment (Positive, Negative, Neutral) immediately upon sending and displays a color-coded tag in the user's chat bubble.

Conversation Trend Analysis: Provides a score and summary of the entire chat session upon ending the conversation, identifying emotional shifts (e.g., "Started negative but ended positive").

Database Persistence: Stores all conversations and messages (including sentiment) using SQLite (chatbot.db).

Modern UI/UX: Features a Teal/Orange color palette, a dark sidebar for history, and a bot typing indicator for enhanced user experience.

Unique Local Configuration: Runs on Port 8000 and binds to 0.0.0.0 for accessibility across your local network.

🚀 Setup and Installation
Follow these steps to get your chatbot running locally.

1. Prerequisites
You need the following installed on your machine:

Python 3.8+

A Google Gemini API Key (required for LLM features).

2. Clone the Repository (or setup files)
Ensure all files (app.py, database.py, sentiment.py, etc., and the templates/, static/ folders) are in your main project directory.

3. Set Up the Environment
First, create a virtual environment (recommended):

Bash

python -m venv venv
source venv/bin/activate  # On Windows, use: .\venv\Scripts\activate
Next, install the required Python packages:

Bash

pip install -r requirements.txt
4. Configure Your API Key
Create a file named .env in your root directory and add your Google Gemini API key:

Ini, TOML

# .env file
GOOGLE_API_KEY="YOUR_GEMINI_API_KEY_HERE"
Replace "YOUR_GEMINI_API_KEY_HERE" with your actual key.

5. Initialize the Database
The database file (chatbot.db) will be created automatically upon running the application.

If you ever need to clear all stored messages and conversations (for a clean slate):

Bash

python clean_db.py
▶️ Running the Application
To start the Flask server, run the app.py file:

Bash

python app.py
Accessing the Chatbot
The server will start on port 8000. You can access the application via one of the following URLs:

Local Access (Your Machine Only): http://127.0.0.1:8000/ OR http://localhost:8000/

Network Access (Other devices on your Wi-Fi/LAN): http://[Your-Local-IP]:8000/ (Replace [Your-Local-IP] with your computer's actual IP address, e.g., http://192.168.1.50:8000/)

⚙️ Project Structure
chatbot-sentiment/
├── app.py              # Main Flask application and API routes
├── database.py         # SQLite connection and CRUD operations
├── sentiment.py        # LLM prompts for message and conversation analysis
├── requirements.txt    # Python dependencies
├── .env                # Stores the GOOGLE_API_KEY
├── clean_db.py         # Script to clear all database entries
├── chatbot.db          # SQLite database file (automatically generated)
├── templates/
│   └── index.html      # Frontend HTML structure
└── static/
    ├── style.css       # Custom Teal/Orange UI styling and animations
    └── script.js       # Frontend logic, AJAX, and Typing Indicator implementation
