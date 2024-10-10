
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { getCookie } from "cookies-next";


const useCurrentUser = () => {

    const currentUser = useAppSelector(selectCurrentUser);
    const token = getCookie('token');
    const { data, isLoading, refetch } = useGetUserQuery({ id: currentUser?.userId as string, token: token as string });
    
    return { data, isLoading, refetch }
};

export default useCurrentUser;