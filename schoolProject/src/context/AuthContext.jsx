import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../utils/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/config";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get user role from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          } else {
            setUserRole("user"); // Default role
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole("user");
        }
      } else {
        setUserRole(null);
      }

      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    loading,
    isAdmin: userRole === "admin",
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
