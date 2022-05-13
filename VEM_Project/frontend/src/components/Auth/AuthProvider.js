import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      localStorage.removeItem("user");
      console.log(error);
    }
  }, [user]);

  const contextValue = {
    user,
    login(credentials_user) {
      setUser(credentials_user);
    },
    logout() {
      setUser(null);
    },
    isLogged() {
      return !!user;
    },
    isPublicitario(){
        return user.rol === "P";
    }
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;