export default function Connection(datas) {
    const email = datas.email;
    const password = datas.password;
    const myHeaders = new Headers();

    const raw = {
        email: email,
        password: password
    };

    const requestOptions = {
        headers: {
            myHeaders,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(raw),
        redirect: 'follow',
    };

    fetch("http://localhost:3000/auth/login", requestOptions)
        .then(response => response.text())
        .then(result => {
            const res = JSON.parse(result);
            const token= res.token;
            const userId = res.userId;
            const username = res.username;
            const role = res.role;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userId', userId);
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('role', role);
            myHeaders.append("Token", token);
        })
        .catch(error => console.log('error', error));
}