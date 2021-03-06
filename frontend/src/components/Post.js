import {useState} from "react";
import '../style/main.scss';
import {createOnePost} from "../constants/postsManager";

const Post = () => {
    const [url, setUrl] = useState('');
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("token", token);
        formData.append("title", title);
        formData.append("userId", userId);
        formData.append("file", file);
        formData.append("url", url);
        createOnePost(formData)

    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="post-form">
                <div className="post-form__item">
                    <input type="text" placeholder='Quoi de neuf ?' className="form-control" id="description" onChange={e => setTitle(e.target.value)}/>
                    <div className="post-form--inline">
                        <input type="url" name="url" id="url" placeholder="https://giphy.com/"  size="80" onChange={e => setUrl(e.target.value)}/>
                        <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])}/>

                    </div>
                </div>
                <button type="submit">Envoyer</button>
                <div id="preview"  />
            </form>
        </div>
    );
}

export default Post;