# 🎬 CineVerse – Movie Explorer App

CineVerse is a **modern Netflix-style Movie & TV exploration web application** built using **React** and **Firebase**, powered by the **TMDB API**.  
It offers a cinematic user experience with secure authentication, personalized watchlists, advanced profile settings, and dark/day mode UI.

🚀 **Live Demo:** https://movie-explorer-app-git-master-varun-uduthas-projects.vercel.app/

---

## ✨ Features

### 🔐 Authentication
- Email & Password Signup/Login
- Google OAuth Login
- Persistent user sessions
- Auth-gated access (entire website visible only after login)

### 🎥 Movie & TV Exploration
- Browse trending, popular, and categorized movies & TV shows
- Modern search bar with live suggestions
- Movie/TV details with ratings, genres, and descriptions
- Trailer playback (when available)
- Pagination / infinite scrolling

### ❤️ User-Specific Watchlist
- Add and remove movies from watchlist
- **Strictly user-based watchlist (UID-based)**
- No cross-user data sharing
- Stored securely in Firestore
- Watchlist persists across sessions

### 👤 Advanced Profile Settings
- Upload profile picture
- Update user name
- Select gender
- Choose interested genres
- Display subscription status (Free plan)

### 🎨 Modern UI / UX
- Netflix-inspired cinematic design
- Dark mode & Day mode
- Smooth hover animations and transitions
- Fully responsive across devices

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router v6
- Context API
- Modern CSS

### Backend / Services
- Firebase Authentication
- Firestore Database
- TMDB API

### Deployment
- Vercel (GitHub auto-deployment)

---

## 📁 Project Structure

src/
├── components/ # Reusable UI components
├── pages/ # Home, Login, Signup, Profile, Watchlist
├── context/ # Auth & Theme contexts
├── services/ # Firebase & TMDB services
├── hooks/ # Custom hooks
├── styles/ # Global & component styles
├── firebase.js # Firebase configuration
└── App.jsx # Main routing


---

## 🔑 Environment Variables

Create a `.env` file in the project root  
(**Do NOT commit this file to GitHub**):

REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id


⚠️ Add the same variables in  
**Vercel → Project Settings → Environment Variables**

---

## ▶️ Run Locally

```bash
# Clone the repository
git clone https://github.com/Varunudutha/Movie-Explorer-App.git

# Navigate to project directory
cd Movie-Explorer-App

# Install dependencies
npm install

# Start development server
npm start
App runs on: http://localhost:3000


🔒 Security

Firebase Authentication securely manages user credentials

Firestore security rules restrict users to only their own data

No sensitive keys or secrets are committed to GitHub

📸 Screenshots

(Add screenshots here to showcase UI)

Home Page

Search

Watchlist

Profile Settings

💼 Resume / Interview Highlights

Built a Netflix-style OTT web application using React

Implemented Firebase Authentication & Firestore with UID-based data isolation

Solved cross-user data leakage issues in watchlist

Designed modern UI with dark/day mode and smooth animations

Deployed using Vercel with GitHub CI/CD

🙌 Author

Udutha Varun

GitHub: https://github.com/Varunudutha

LinkedIn: https://www.linkedin.com/in/varun-udutha-67b137265

Portfolio: https://varunudutha.github.io/varun-portfolio/

📄 License

This project is created for educational and portfolio purposes.
Movie data is provided by TMDB API and follows their usage terms.
