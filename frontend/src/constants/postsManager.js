import axios from 'axios';

export const deleteOnePost = (datas) => {
    const userId = datas.userId;
    const token = datas.token;
    const postId = datas.postId;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Accept", 'application/json');
    myHeaders.append("Content-Type", 'application/json');

    const raw = {
        userId: userId,
        token: token,
        postId: postId
    };
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify(raw),
    };

    fetch("http://localhost:3000/content/delete", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

export const AddPost = (datas) => {
    console.log(datas)
    const userId = datas.userId;
    const token = datas.token;
    const title = datas.title;
    const url = datas.url;
    const gif = datas.file;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Accept", 'application/json');
    myHeaders.append("Content-Type", 'application/json');

    const raw = {
        userId: userId,
        token: token,
        title: title,
        url: url,
        gif: gif
    };
     console.log(myHeaders);
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify(raw),
    };

    fetch("http://localhost:3000/content/create", requestOptions)
        .then(response => {
            if(response.status === 200 ) {
                response.json()
            } else {
                console.log(response.status)
                // TODO:gérer l'erreur / afficher l'erreur
            }
        })
        .then(result => {
            console.log(result)
        })
        .catch(error => console.log('error', error));
}