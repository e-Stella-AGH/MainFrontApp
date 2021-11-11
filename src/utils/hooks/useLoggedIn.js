import {jwtUtils} from "../jwt/jwtUtils";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import {loginAPI} from "../apis/LoginAPI";

export const useLoggedIn = () => {
    const history = useHistory()
    const [loggedIn, setLoggedIn] = useState(jwtUtils.getUser() != null)

    const logout = () => {
        localStorage.removeItem(loginAPI.authTokenStorageKey)
        localStorage.removeItem(loginAPI.refreshTokenStorageKey)
        setLoggedIn(false)
        history.push("/")
        window.location.reload()
    }

    const login = () => {
        setLoggedIn(true)
        window.location.reload()
    }

    return { loggedIn, login, logout }
}