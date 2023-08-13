#Pantau
The project aims to analyse the sentiment and online reputation of local brands on Twitter. The project's overall objective is to provide a tool for local banks to monitor and understand the sentiment and reputation of their brand on Twitter and to enable them to make informed decisions based on this information. It involves extracting data from brand account pages on Twitter, performing sentiment analysis on the data using a monolingual model, calculating the brand's online presence reputation score based on the sentiment and other factors related to the brand's online presence, and visualising the results using charts, graphs, and tables. The extracted data includes user profiles, tweets, mentions, replies and relevant metadata from the brand account pages. Sentiment Analysis module uses Python machine learning library, Scikit-learn, specifically SVM Support Vector Machine (SVM) with a linear kernel to classify the sentiment of the data as positive, negative, or neutral. Online Reputation Scoring module calculates the score based on sentiment and other factors. Data Visualisation module allows users to customise the appearance and layout of the visualisations and interact with the data in real time. The project outcome is a system that can efficiently analyse and visualise the sentiment and reputation of brands on Twitter.

**Requirements:**
- Node.js (Download: https://nodejs.org/en)
- React.js
- FastAPI
- MySQL (WAMP) (Link: http://localhost/phpmyadmin/)
- Twitter API credentials

**Frontend (React.js):**
1. Go to the project root directory.
2. Install frontend dependencies:
   ```
   npm install
   ```

**Backend (Node.js):**
1. Go to the "backend" directory:
   ```
   cd backend
   ```
2. Install nodemon globally:
   ```
   npm install -g nodemon
   ```
3. Install Node.js dependencies:
   ```
   npm install
   ```
4. Create the database in phpMyAdmin:
   - Go to http://localhost/phpmyadmin/
   - Create a database named "pantaudb"

**FastAPI (Python):**
1. Go to the "fastapi" directory:
   ```
   cd fastapi
   ```
2. Activate the virtual environment in the terminal:
   - On Windows:
     ```
     .\env\Scripts\Activate
     ```
   - On macOS or Linux:
     ```
     source env/bin/activate
     ```
   To deactivate the virtual environment, simply execute:
   ```
   deactivate
   ```
3. Install FastAPI and other Python dependencies:
   ```
   pip install -r requirements.txt
   ```

**Data Extraction from Twitter API:**
1. Go to the "extract" directory:
   ```
   cd extract
   ```
2. Open the "config.ini" file and fill in your Twitter API credentials:
   ```
   api_key =
   api_key_secret =
   access_token =
   access_token_secret =
   ```
3. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

**Running the Application:**
1. Start the backend (Node.js):
   ```
   cd backend
   nodemon index
   ```
2. Start the frontend (React.js) development server:
   ```
   npm start
   ```


3. Start the FastAPI server:
   ```
   cd fastapi
   env\Scripts\activate
   uvicorn app:app --reload
   ```
4. Data Extraction from Twitter API:
   - Go to the "extract" directory:
     ```
     cd extract
     ```
   - Run the Python scripts individually:
     ```
     python replies.py
     python mentions.py
     python users.py // the data for user need to manually update. import the csv file into the database.
     python tweet.py
     ```

Please note that you will need to open a separate terminal for each of the scripts to run simultaneously. Make sure you have completed all the prerequisites and installations before running the application.
