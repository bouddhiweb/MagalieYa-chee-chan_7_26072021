export default function Delete(datas) {
    const myHeaders = new Headers();
    const userId = datas.userId;
    const token = datas.token;
    const postId = datas.postId;


    const raw = {
        userId: userId,
        token: token,
        postId: postId
    };
    myHeaders.append("Authorization", token);

    const requestOptions = {
        method: 'POST',
        headers: {
            myHeaders,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(raw),

    };

    fetch("http://localhost:3000/content/delete", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}