import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVijeRVF6atDSMIZYVR_8E1Tveh0ATGLc",
  authDomain: "ju-portfolio-2025.firebaseapp.com",
  projectId: "ju-portfolio-2025",
  storageBucket: "ju-portfolio-2025.appspot.com",
  messagingSenderId: "511071297374",
  appId: "1:511071297374:web:565ca97ed8b2001ee7f9cf",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
