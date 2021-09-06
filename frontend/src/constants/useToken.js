import { useState } from 'react';

export default function useToken() {

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        // console.log(tokenString);
        const userToken = {
            token: tokenString
        };
        // console.log(tokenString);
        return userToken?.token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.getItem('token');
        setToken(userToken.token);
        //console.log(token);
    };

    return {
        setToken: saveToken,
        token
    }

}