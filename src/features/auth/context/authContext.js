import { createContext } from "react";

export const AUTH_STATUS = {
  LOADING: "loading",
  AUTHENTICATED: "authenticated",
  GUEST: "guest",
};

export const AuthContext = createContext(null);