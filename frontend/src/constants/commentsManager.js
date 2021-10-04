import axios from 'axios';
const DELETE_COMMENT_URL = 'http://localhost:3000/comment/delete';
const ADD_COMMENT_URL = 'http://localhost:3000/comment/create';

export const deleteOneComment = (datas) => {
    const userId = datas.userId;
    const token = datas.token;
    const commentId = datas.commentId;

    const data = {
        userId: userId,
        token: token,
        commentId: commentId
    };
    axios
        .post(DELETE_COMMENT_URL, data)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            alert("erreur : " + err)
        });
}

export const addComment = (datas) => {
    const userId = datas.userId;
    const token = datas.token;
    const postId = datas.postId;
    const body = datas.body;

    const raw = {
        userId: userId,
        postId: postId,
        token: token,
        body: body
    };

    axios
        .post(ADD_COMMENT_URL, raw)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            alert("erreur : " + err)
        });
}


