import {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Post from '../components/Post'


export default function HomePage() {
    const username = sessionStorage.getItem('username');
    console.log(sessionStorage);
    let [data, setItems]:any = useState({});
    useEffect(() => {
        // const token = sessionStorage.getItem('token');
        const myHeaders = new Headers();
        const requestOptions:any = {
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow'
        };
        // myHeaders.append("Authorization", 'Bearer ' + token);

        fetch("http://localhost:3000/content/list", requestOptions)
            .then(response => response.json())
            .then(result  => {
                //console.log(result)
                setItems(result)
            })
            .catch(error => console.log('error', error));
    },[])
    const postsId:any = [];
    const postsDate:any = [];
    for(let i = 0; i < data.length; i++) {
        // console.log(i)

        let date = new Date(data[i].created);
         const year = date.getFullYear();
         const month = (date.getMonth()+1);
         const day = date.getDate();
         const hour = date.getHours();
         const minute = (date.getMinutes()<10?'0':'') + date.getMinutes() ;
         const formatDate = day + '/' + month + '/' + year + ' à ' + hour + ':' + minute;
         postsDate.push(formatDate);
        postsId.push(i);
    }

    const listItems = postsId.map((postId:any) =>
        <ul className='feed__post'>
            <li className='feed__post__head'>{data[postId].title} <span className='feed__post__date'>de <b>{data[postId].username}</b> posté le <b>{postsDate[postId]}</b></span></li>
            <hr/>
            <li className='feed__post__content'>
                <iframe src={data[postId].url} width="480" height="311" frameBorder="0" className="giphy-embed" title={data[postId].username} allowFullScreen />
            </li>
            <div>
                <form className='comments-form' noValidate autoComplete="off">
                    <TextField className='form-items' id="standard-basic" label="Ecrivez un commentaire..." />
                    <IconButton className="Mui-focused" aria-label="add a comment">
                        <SendIcon/>
                    </IconButton>
                </form>
                <div className='feed__comments'>
                    <p><i>Commentaires affichés ici</i></p>
                    <span>de Bob, le 00/00/00 à 00:00</span>
                </div>
                <div className='feed__comments'>
                    <p><i>Commentaires affichés ici</i></p>
                    <span>de Bob, le 00/00/00 à 00:00</span>
                </div>
            </div>
        </ul>
    );

    return (
        <div className='feed__box'>
            <h2>Bonjour, </h2>
            <Post />
            <h2 className='feed__title'>Fil d'actualité</h2>
            <div>{listItems}</div>
        </div>
    )
}
