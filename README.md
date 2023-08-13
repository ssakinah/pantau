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
2. Create a Python virtual environment (venv) using the terminal:
   ```
   python -m venv env
   ```
3. Activate the virtual environment in the terminal:
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
4. Install FastAPI and other Python dependencies:
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
