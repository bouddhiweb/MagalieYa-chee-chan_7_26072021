import {useEffect, useState} from 'react';
import axios from 'axios';
import '../style/main.scss';
import {addComment, deleteOneComment} from "../constants/commentsManager";
import {deleteOnePost} from "../constants/postsManager";
import Post from '../components/Post'
import TextField from "@material-ui/core/TextField";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function HomePage() {
    const token = sessionStorage.getItem('token');
    const userId= sessionStorage.getItem('userId');
    const username = sessionStorage.getItem('username');
    let [data, setItems]:any = useState({});
    let [commentDatas, setComments]:any = useState({});
    let [body, setBody] = useState("");
    let [pId, setpId] = useState("");

    const postsId:any = [];
    const postsDate:any = [];
    const commentsId:any = [];
    const commentsDate:any = [];

    const POSTLIST_URL = 'http://localhost:3000/content/list';
    const COMMENTLIST_URL = 'http://localhost:3000/comment/list';

    useEffect(() => {
         setInterval(() => {
            axios
                .get(POSTLIST_URL)
                .then(res => {
                    setItems(res.data)
                })
                .catch(error => {
                    console.log('error', error)
                });
         }, 250)
    },[])

    const displayComments = (e:any) => {
        e.preventDefault();
        const postId = e.currentTarget.title;
        let datas = {
            token : token,
            postId: postId,
        };
        setInterval(() => {
        axios
            .post(COMMENTLIST_URL, datas)
            .then((res) => {
                setComments(res.data)
            })
            .catch((err) => {

                alert("erreur : " + err)
            });
        }, 250)
    }

    for(let i = 0; i < data.length; i++) {
        let date = new Date(data[i].created);
        const year = date.getFullYear();
        const month = (date.getMonth()+1);
        const day = date.getDate();
        const hour = date.getHours();
        const minute = (date.getMinutes()<10?'0':'') + date.getMinutes() ;
        const formatDate = day + '/' + month + '/' + year + ' à ' + hour + ':' + minute;
        postsDate.push(formatDate);
        postsId.push(i);
        data[i].comments = commentDatas;
    }

    for(let i = 0; i < commentDatas.length; i++) {
        let cDate = new Date(commentDatas[i].created);
        const cYear = cDate.getFullYear();
        const cMonth = (cDate.getMonth()+1);
        const cDay = cDate.getDate();
        const cHour = cDate.getHours();
        const cMinute = (cDate.getMinutes()<10?'0':'') + cDate.getMinutes() ;
        const formatDate = cDay + '/' + cMonth + '/' + cYear + ' à ' + cHour + ':' + cMinute;
        commentsDate.push(formatDate);
        commentsId.push(i);
    }

    const deletePost = (e:any) => {
        e.preventDefault();
        const postId = e.currentTarget.title;
        let datas = {
            token : token,
            userId: userId,
            postId: postId
        };
        deleteOnePost(datas);
    }

    const handleChange = (e:any) => {
        setpId(e.target.name);
        if(pId === e.target.name) {
            setBody(e.target.value);
        }
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        let datas = {
            token : token,
            userId: userId,
            postId: pId,
            body: body
        };
        addComment(datas);
        e.target.reset();
    }

    const deleteComment = (e:any) => {
        const commentId = e.target.id;
        let datas = {
            token : token,
            userId: userId,
            commentId: commentId,
        };
        deleteOneComment(datas);
    }


// console.log(commentDatas)
    const listItems = postsId.map((postId:string) =>
        /* Itération des posts */
        <ul className='feed__post' id={data[postId].id}>
            <li className='feed__post__head'>{data[postId].title} <span className='feed__post__date'>de <b>{data[postId].username}</b> posté le <b>{postsDate[postId]}</b></span>
                <IconButton onClick={deletePost} title={data[postId].id} data-postId={data[postId].id} className="Mui-focused">
                    <DeleteOutlineIcon/>
                </IconButton>
            </li>
            <hr/>
            <li className='feed__post__content'>
                {/*<iframe src={data[postId].url} width="480" height="311" frameBorder="0" className="giphy-embed" title={data[postId].username} allowFullScreen />*/}
                <img width="400" src={data[postId].url} alt={data[postId].title}/>
            </li>
            <div>
                <span className='white-text__link' title={data[postId].id} onClick={displayComments}><ChevronRightIcon/> Afficher les commentaires</span>
                {/*Affichage des commentaires qui dépendent du post */}
                {commentsId.map((commentId: string) => <div className='white-text'> {commentDatas[commentId].id_post === data[postId].id ? <li className='white-text comments-form'><b>{commentDatas[commentId].username} :</b> {commentDatas[commentId].body}
                    <p className='deleteComment' id={commentDatas[commentId].id} onClick={deleteComment}>Supprimer ce commentaire</p></li> : ''}</div>)}
                {/* Formulaire pour ajouter un commentaire  */}
                <form className='comments-form' onSubmit={handleSubmit}>
                    <TextField name={data[postId].id} className='form-items' placeholder="Ecrivez un commentaire..." onInput={handleChange} />
                    <IconButton type="submit" className="Mui-focused" aria-label="add a comment">
                        <SendIcon data-post-id={data[postId].id} key={data[postId].id} />
                    </IconButton>
                </form>
            </div>
        </ul>
    );
    return (
        <div className='feed__box'>
            <h2 className='feed__title'>Hello {username} !</h2>
            <Post />
            <h2 className='feed__title'>Fil d'actualité</h2>
            <div>{listItems}</div>
        </div>
    );
}
