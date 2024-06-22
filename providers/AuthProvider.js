import { createContext, useEffect, useState } from "react";
import authService from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  async function login(username, password) {
    setAuthData(true);
    const _authData = await authService(username, password);
    setAuthData(_authData);
    await AsyncStorage.setItem("authData", JSON.stringify(_authData));
  }
  useEffect(() => {
    loadAuthData();
  }, []);
  function logout() {
    setAuthData(undefined);
  }
  async function loadAuthData() {
    try {
      const authDataSerialized = await AsyncStorage.getItem("authData");
      if (authDataSerialized) {
        const _authData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
      console.log("You couldn't load set data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ authData, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
