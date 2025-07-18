import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATVUvYzdiIfLHkZkiWMtFdQtmO_4ogQuk",
  authDomain: "movie-explorer-app-138e9.firebaseapp.com",
  projectId: "movie-explorer-app-138e9",
  storageBucket: "movie-explorer-app-138e9.appspot.com",
  messagingSenderId: "568640575330",
  appId: "1:568640575330:web:2303d66e5b42ffc5d63e3b",
  measurementId: "G-KVFZRKFH4X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ ADD THIS:
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
