import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const signup = async (email, password) =>
    await createUserWithEmailAndPassword(auth, email, password);

  const login = async (email, password) =>
    await signInWithEmailAndPassword(auth, email, password);

  const logout = async () => await signOut(auth);

  const forgotPassword = async (email) =>
    await sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubcribe;
  }, []);

  return (
    <authContext.Provider
      value={{ signup, login, user, logout, loading, forgotPassword }}
    >
      {children}
    </authContext.Provider>
  );
};
