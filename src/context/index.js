import { createContext } from "react";

export const AuthContext = createContext({
    loading: false,
    login: "",
    logout:''
})