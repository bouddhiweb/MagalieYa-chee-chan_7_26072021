import {useState} from "react";
import '../style/main.scss';
import {AddPost} from "../constants/postsManager";


const Post = () => {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');

    const addPost = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        let datas = {
            token : token,
            userId: userId,
            title: title,
            url: url
        };
        console.log(datas)
         AddPost(datas);
    }

    return (
        <div>
            <form className="post-form">
                <div className="post-form__item">
                    <input type="text" placeholder='Quoi de neuf ?' className="form-control" id="description" onChange={e => setTitle(e.target.value)}/>
                    <div className="post-form--inline">
                        <input type="url" name="url" id="url" placeholder="https://giphy.com/" pattern="https://giphy.com/embed/*" size="80" onChange={e => setUrl(e.target.value)}/>
                        {url ? <div/> : <div id="fileInput"> <input name="url" type="file" accept="image/*"/></div>}
                    </div>
                </div>
                <button onClick={addPost}>Envoyer</button>
            </form>
        </div>
    );
}

export default Post;