"use client";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create AuthContext
export const AuthContext = createContext(null);

// AuthProvider component
export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/User");

      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
