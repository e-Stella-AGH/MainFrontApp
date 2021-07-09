import {loginAPI} from "../apis/LoginAPI";
import {jwtUtils} from "../jwt/jwtUtils";
import {validateSchema} from "../schemas/validateSchema";
import {tokenPayloadSchema} from "../schemas/tokenPayloadSchema";


export const useUser = () => {
    const token = localStorage.getItem(loginAPI.authTokenKey)
    const possiblyUser = jwtUtils.getPayload(token)

    if(validateSchema(possiblyUser, tokenPayloadSchema))
        return possiblyUser
    
}