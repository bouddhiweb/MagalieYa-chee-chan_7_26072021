export default function Signup(datas) {
    const username = datas.username;
    const email = datas.email;
    const password = datas.password;

    const raw = {
        username: username,
        email: email,
        password: password
    };

    const requestOptions = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(raw),
        redirect: 'follow',
    };

    fetch("http://localhost:3000/auth/signup", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}