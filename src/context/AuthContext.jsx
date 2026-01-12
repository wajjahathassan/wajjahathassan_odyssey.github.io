import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to connect to Firebase Auth
    try {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
          setLoading(false);
        });
        return unsubscribe;
    } catch (error) {
        // If Firebase fails (wrong keys), stop loading so the site still shows up
        console.error("Auth Error:", error);
        setLoading(false);
    }
  }, []);

  // AGAR LOADING HAI TO BHI SITE DIKHAO (Temporary fix for Portfolio)
  // Humne {!loading && children} ko hata kar seedha {children} kar diya
  // Taaki agar Firebase fail ho, tab bhi website nazar aaye.
  
  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children} 
    </AuthContext.Provider>
  );
};