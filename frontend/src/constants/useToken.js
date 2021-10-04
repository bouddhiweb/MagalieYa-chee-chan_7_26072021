import { useState } from 'react';

export default function useToken() {

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = {
            token: tokenString
        };

        return userToken?.token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.getItem('token');
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }

}