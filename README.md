# 👩‍🍳 Voice-Assisted Cooking Recipe App

A full-stack MERN application that helps users cook smarter with step-by-step guidance and real-time voice interaction. The assistant blends rule-based step tracking with AI-powered (Gemini) responses, providing a truly interactive cooking experience.

---

## 🔧 Features

- 🔍 **Search Recipes** – Browse recipes from the Spoonacular API or view those submitted by users.
- ✍️ **User Recipe Uploads** – Authenticated users can submit their own custom recipes with images.
- 🧠 **Smart Assistance (Rule-Based + AI)**  
  This app combines:
  - ✅ **Rule-Based Logic**: Tracks current step in the recipe, supports commands like “next step”, “repeat”, “go to step 3”, etc.
  - 🤖 **AI Assistance (Gemini)**: Users can ask natural questions like:
    - “What did I do before this?”
    - “Can I substitute oil with butter?”
    - “How long should I cook this?”
    Gemini generates intelligent replies based on the recipe and current step.
- 🎙 **Voice Interface** – Use the Web Speech API to control and talk to the assistant hands-free.
- 💬 **Context-Aware Responses** – Assistant understands what step you’re on and answers accordingly.
- 🖼️ **Cloudinary Image Upload** – Upload and store recipe images securely.
- 🔐 **Authentication** – Users register and log in using JWT-secured auth.

---

## 🧱 Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS / ShadCN
- Web Speech API

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Google Gemini API
- Cloudinary
- JWT Authentication

---

## 🚀 Getting Started

### 🔗 Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)
- Spoonacular API Key
- Google Gemini API Key
- Cloudinary Account

---

### 🛠 Environment Setup

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
