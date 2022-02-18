import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ID, Client_Secret, URL } from "@env";

export const CLIENT_ID = ID;
export const CLIENT_SECRET = Client_Secret;
export const CALLBACK_URL = URL;

export async function getAuthToken() {
  return SecureStore.getItemAsync(CLIENT_ID || "?");
}

export async function getUsername() {
  return SecureStore.getItemAsync("username");
}

export function useAuthToken() {
  const [token, setToken] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    getAuthToken().then((newToken) => {
      if (newToken) {
        setToken(newToken);
      }
      setLoading(false);
    });
  }, []);

  return [token, setToken, { loading }];
}

const AuthContext = createContext({});



export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoading: true,
    isSignout: false,
    userToken: null,
    username: null,
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let username;

      try {
        userToken = await SecureStore.getItemAsync(CLIENT_ID);
        username = await SecureStore.getItemAsync("username");
      } catch (e) {
        console.error(e);
      }
      if (userToken && username) {
        setState({
          ...state,
          userToken,
          isLoading: false,
          username,
        });
      }
    };

    bootstrapAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authContext = {
    signIn: async (token, username) => {
      await SecureStore.setItemAsync(CLIENT_ID, token);
      await SecureStore.setItemAsync("username", username);
      setState({
        ...state,
        userToken: token,
        isLoading: false,
        username,
      });
    },
    signOut: async () => {
      await SecureStore.deleteItemAsync(CLIENT_ID);
      setState({
        ...state,
        isSignout: true,
        userToken: null,
        username: null,
      });
    },
    state,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthCtx must be called in AuthProvider");
  }
  return context;
};
