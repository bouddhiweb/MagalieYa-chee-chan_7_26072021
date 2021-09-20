import ReactDOM from "react-dom";

export const add = (datas) => {
    const userId = datas.userId;
    const token = datas.token;
    const postId = datas.postId;
    const body = datas.body;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Accept", 'application/json');
    myHeaders.append("Content-Type", 'application/json');

    const raw = {
        userId: userId,
        postId: postId,
        token: token,
        body: body
    };
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify(raw),
    };

    fetch("http://localhost:3000/comment/create", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

export const display = (datas) => {
    const token = datas.token;
    const postId = datas.postId;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Accept", 'application/json');
    myHeaders.append("Content-Type", 'application/json');

    const raw = {
        postId: postId,
        token: token,
    };
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify(raw),
    };

    fetch("http://localhost:3000/comment/list", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}