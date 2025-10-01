# 🌌 KiraVerse

**KiraVerse** is a **React Frontend** web app that brings the world of Anime & Manga to life.  
It uses **Firebase Authentication** for user management and a free Anime/Manga API for content.  

---

## ✨ Features

### 🔑 Authentication
- Sign Up / Sign In / Log Out with **Firebase Auth**.
- Reset Password functionality.
- Update Display Name after logging in.
- Add / Remove **Favorites** → Favorites appear on the User Profile page.

### 👤 User Profile
- Display user info (Name + Email).
- Show user’s favorites list.
- Change name, reset password, and log out easily.

### ⭐ Reviews
- Like / Unlike reviews.
- Likes are saved in **localStorage** → no loss after refresh.

### 📺 Anime & Manga Pages
- Browse Anime & Manga.
- **Search** functionality.
- Pagination (25 items per page).

### 🏆 Top Page
- Explore:
  - 🥇 Top Anime
  - 📚 Top Manga
  - 🎭 Top Characters
- Filter by category.

### 📖 About Page
- Introduction to **Anime** and **Manga**.
- Explanation of different **Anime genres**.
- Helps new users understand the culture and categories better.

### 🎨 UI / UX
- Stylish **Header** with Logo + Navigation.
- **Responsive Design** (Burger Menu for mobile, Flexbox and Grid layouts).
- 🌗 Dark / Light Mode toggle.
- ⬆️ Scroll-to-Top button.
- Modern Glow + Gradient effects on buttons and logo.

---

## 🛠 Tech Stack
- ⚛️ **React.js** (Frontend)
- 🔥 **Firebase Auth** (Authentication)
- 🎨 **CSS3**
- 🎭 **Material UI Icons**
- 💾 **localStorage**
- ⚡ **Vite**

---

## ⚙️ Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/Hebaade/KiraVerse.git
   cd KiraVerse
2. Create a **.env** file in the root directory and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
