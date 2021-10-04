import Layout from "../components/Layout";
import React from "react";
import Login from "../pages/login";
import useToken from "../constants/useToken";

function App() {
    const { token, setToken } = useToken();
    console.log(token);


    if(!token || token === 'undefined') {
        return <Login setToken={setToken} />
    }
    return (
        <Layout />
    );
}

export default App;
