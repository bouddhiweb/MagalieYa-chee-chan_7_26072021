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
            const username = res.username;
             console.log(result);
            sessionStorage.setItem('token', token, 'username', username);
            myHeaders.append("Token", token, 'username', username);
        })
        .catch(error => console.log('error', error));
}