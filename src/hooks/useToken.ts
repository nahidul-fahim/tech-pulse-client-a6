import { getCookie } from "cookies-next";

const useToken = () => {

    const token = getCookie('token');
    
    return token as string;
};

export default useToken;