# Fullstack ML Loan Risk Dashboard

A small full-stack machine learning project built to practice combining **data science, backend APIs, and frontend applications**.

The application predicts the probability that a user may **default on a loan** using a trained machine learning model.  
Predictions can be made through a simple web interface and the results are visualized using charts.

The goal of this project was to practice building and connecting:

- Machine Learning models
- Backend APIs
- Frontend applications
- Data visualization

---

## Project Overview

The project contains three main parts:

### 1️⃣ Machine Learning

A classification model was trained to predict **loan default risk** based on user financial features.

Example input features:

- monthly income
- monthly expense
- age
- smartphone ownership
- wallet ownership
- wallet balance
- payment history
- number of previous loans

The model outputs:

- predicted class (default or no default)
- probability for both classes

The trained model is saved and loaded by the backend for real-time predictions.

---

### 2️⃣ Backend API (Django + DRF)

The backend exposes a REST API that:

- receives user input
- loads the trained model
- runs prediction
- returns probability results

Example API endpoint:

POST /api/predict/

Example request:

````json
{
  "monthly_income": 20000,
  "monthly_expense": 9000,
  "age": 28,
  "has_smartphone": 1,
  "has_wallet": 1,
  "avg_wallet_balance": 5000,
  "on_time_payment_ratio": 0.85,
  "num_loans_taken": 2
}

Example response:

```json
{
  "prediction": 0,
  "probability": {
    "class_0": 0.91,
    "class_1": 0.09
  }
}
````

---

### 3️⃣ Frontend (React + TypeScript + Tailwind)

The frontend allows users to:

- submit prediction inputs
- see prediction results
- view prediction probabilities
- track prediction history
- visualize results with charts

Charts included:

- Line chart → risk trend across submissions
- Bar chart → risk per submission
- Pie chart → probability split for latest prediction

---

## Tech Stack

### Machine Learning

- Python
- Pandas
- Scikit-learn
- Jupyter Notebook

### Backend

- Django
- Django REST Framework
- Python

### Frontend

- React
- TypeScript
- TailwindCSS
- Recharts

---

## Project Structure

fullstack-ml-dashboard/

backend/
api/
config/
manage.py

frontend/
src/
components/
pages/
services/
types/

ml/
notebooks
data
model

DEV_NOTES/
learning notes created during development

---

## Running the Project Locally

### Backend

Navigate to the backend folder:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv .venv
```

Activate environment:

```bash
# Windows
.venv\Scripts\activate

# Git Bash
source .venv/Scripts/activate

# macOS
source .venv/bin/activate
```

```bash
# Install dependencies
pip install -r requirements.txt

# Run the server
python manage.py runserver
```

The API will run at:

http://127.0.0.1:8000

---

### Frontend

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Frontend enviroment variables
# Copy the example file and create your local env file
cp .env.example .env.local

# Run development server
npm run dev
```

Open:

http://localhost:5173

---

## Learning Notes

This repository includes development notes inside:

```text
DEV_NOTES/
```

These notes explain key concepts learned while building the project such as:

- ML pipelines
- API integration
- React state management
- chart data transformation
- full-stack ML workflows

---

## Why I Built This

This project was built as a learning exercise to strengthen understanding of:

- machine learning workflows
- serving ML models through APIs
- connecting backend services to frontend applications
- visualizing prediction results in a web interface

---

## Future Improvements

Possible improvements include:

- model retraining pipeline
- authentication for predictions
- storing prediction history in a database
- improved chart interactivity
- deploying the project online
