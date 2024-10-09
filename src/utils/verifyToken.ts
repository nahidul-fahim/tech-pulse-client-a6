import { jwtDecode } from "jwt-decode"

export const verifyToken = (token: string) => {
    try {
        return jwtDecode(token)
    } catch (error) {
        console.log("Error verifying token =>", error);
        return null;
    }
};