import axios from 'axios';

const DELETE_POST_URL = 'http://localhost:3000/content/delete';
const CREATE_POST_URL = 'http://localhost:3000/content/create';

export const createOnePost = (newPostData) => {
    axios
        .post(CREATE_POST_URL, newPostData)
        .then((res) => {
            alert("Ton gif a bien été posté !");
        })
        .catch((err) => {

            alert("erreur : " + err)
        });
}

export const deleteOnePost = (datas) => {
    const userId = datas.userId;
    const token = datas.token;
    const postId = datas.postId;

    const items = {
        userId: userId,
        token: token,
        postId: postId
    };

    axios
        .post(DELETE_POST_URL, items)
        .then((res) => {
            alert("Ton gif a bien supprimé !");
        })
        .catch((err) => {
            alert("erreur : " + err)
        });
}
