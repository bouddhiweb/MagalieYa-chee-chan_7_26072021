export default function Delete(datas) {
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
    console.log(myHeaders);
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