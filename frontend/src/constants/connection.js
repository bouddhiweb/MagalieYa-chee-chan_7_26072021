import axios from "axios";

export default function Connection(datas) {
    const LOGIN_URL = 'http://localhost:3000/auth/login';
    const email = datas.email;
    const password = datas.password;
    const myHeaders = new Headers();
    const data = {
        email: email,
        password: password
    };

    axios
        .post(LOGIN_URL, data)
        .then((res) => {
            const token = res.data.token;
            const userId = res.data.userId;
            const username = res.data.username;
            const role = res.data.role;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userId', userId);
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('role', role);
            myHeaders.append("Token", token);
            document.location.reload()
        })
        .catch((err) => {
            alert("erreur : un problème est survenu au moment de la connexion" + err)
        });
}