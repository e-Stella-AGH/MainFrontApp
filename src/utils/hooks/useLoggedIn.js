import {jwtUtils} from "../jwt/jwtUtils";
import {useState} from "react";

export const useLoggedIn = () => {
    const [loggedIn, setLoggedIn] = useState(jwtUtils.getUser() != null)
    const logout = () => {
        localStorage.clear()
        setLoggedIn(false)
        window.location.reload()
    }
    const login = () => {
        setLoggedIn(true)
        window.location.reload()
    }
    return { loggedIn, login, logout }
}