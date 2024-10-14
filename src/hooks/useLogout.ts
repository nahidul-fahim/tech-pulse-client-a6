"use client"
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { deleteCookie } from "cookies-next";

const useLogout = () => {
    const dispatch = useAppDispatch();

    const logoutUser = () => {
        deleteCookie("token");
        dispatch(logout());
    }
    return logoutUser;
};

export default useLogout;