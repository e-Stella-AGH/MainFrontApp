import {loginAPI} from "../apis/LoginAPI";
import {jwtUtils} from "../jwt/jwtUtils";


export const useUser = () => {
    const token = localStorage.getItem(loginAPI.authTokenKey)
    const possiblyUser = jwtUtils.getPayload(token)

    
}