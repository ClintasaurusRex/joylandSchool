import React, { createContext, useState, useEffect } from "react";
import { auth } from "../utils/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/config";

// Export the context so it can be imported in useAuth.js
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // console.log("Auth state changed:", user ? user.email : "No user");

      if (user) {
        // Get user role from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role;
            // console.log("User role from Firestore:", role);
            setUserRole(role);
          } else {
            console.log("User document doesn't exist, setting default role");
            setUserRole("user");
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

  // console.log("Auth context value:", {
  //   currentUser: currentUser?.email,
  //   userRole,
  //   isAdmin: userRole === "admin",
  // });

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
