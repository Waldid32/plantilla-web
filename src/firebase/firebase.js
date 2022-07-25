import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCB00BwRKe2hbSnMJmF577RC27rdiicfX8",
  authDomain: "plantilla-we-ff906.firebaseapp.com",
  projectId: "plantilla-we-ff906",
  storageBucket: "plantilla-we-ff906.appspot.com",
  messagingSenderId: "93115225493",
  appId: "1:93115225493:web:c184922877d0277076529c",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
