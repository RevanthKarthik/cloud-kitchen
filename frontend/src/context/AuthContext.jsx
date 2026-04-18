import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem("lastActive", Date.now());
    }

    const handleBeforeUnload = () => {
      localStorage.setItem("lastActive", Date.now());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    const interval = setInterval(() => {
      const last = localStorage.getItem("lastActive");

      if (last && Date.now() - last > 21 * 60 * 1000) {
        localStorage.removeItem("user");
        setUser(null);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};