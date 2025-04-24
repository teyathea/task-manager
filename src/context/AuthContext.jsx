import React, { createContext, useReducer, useEffect } from "react";
import {
  getStoredUser,
  storeCurrentUser,
  clearStoredUser,
  getStoredUsers
} from "../utility/localStorage";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      storeCurrentUser(action.payload.username);
      return { ...state, user: action.payload.username, isAuthenticated: true };
    case "LOGOUT":
      clearStoredUser();
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: getStoredUser(),
    isAuthenticated: !!getStoredUser(),
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;