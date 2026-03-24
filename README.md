# 🤖 AI Code Reviewer

An AI-powered full-stack web application that analyzes code, detects issues, and suggests improvements in real-time.

---

## 🚀 Features

* 🔍 AI-based code analysis
* ⚡ Real-time feedback
* 🧠 Smart suggestions & improvements
* 🌐 Multi-language support (JavaScript, Python, Java, C++)
* 📋 Copy improved code feature
* 🎨 Clean and modern UI
* ☁️ MongoDB integration (optional storage)

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Axios
* Highlight.js (syntax highlighting)

### Backend

* Node.js
* Express.js
* OpenRouter API (LLM integration)

### Database

* MongoDB Atlas

---

## 📂 Project Structure

```
ai-code-reviewer/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── App.jsx
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone https://github.com/Prabhakar4039/Ai_code_reviewer.git
cd Ai_code_reviewer
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
OPENROUTER_API_KEY=your_api_key
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run backend:

```
node server.js
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🌍 Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 🧠 How It Works

1. User enters code in frontend
2. Code is sent to backend API
3. Backend sends request to AI (OpenRouter)
4. AI analyzes and returns structured feedback
5. Results are displayed in UI

---


## 📌 Future Improvements

* 🔐 User authentication
* 📊 Code history dashboard
* 🌙 Dark/Light mode toggle
* 🌍 More language support
* 📈 Performance scoring graphs

---

## 💼 Resume Description

> Built a full-stack AI-powered code review application using React, Node.js, OpenRouter API, and MongoDB that analyzes code quality and provides real-time suggestions.

---

## ⭐ Contribute

Feel free to fork and improve this project!

---

## 📧 Contact

* GitHub: https://github.com/Prabhakar4039

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
