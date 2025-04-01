import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAk2FXPJCZF9Q4Hzc5M3QqNgjzBG8T9MI",
  authDomain: "questionnaire-app-43015.firebaseapp.com",
  projectId: "questionnaire-app-43015",
  storageBucket: "questionnaire-app-43015.firebasestorage.app",
  messagingSenderId: "518022847169",
  appId: "1:518022847169:web:f5e45deaa81b95e607d240",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
