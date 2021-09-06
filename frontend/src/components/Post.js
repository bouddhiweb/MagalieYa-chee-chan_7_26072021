const Post = () => {

    return (
        <div>
            <form className="post-form">
                <div className="post-form__item">
                    <input type="text" placeholder='Quoi de neuf ?' className="form-control" id="description" />
                    <div className="post-form--inline">
                        <input type="url" name="url" id="url" placeholder="https://giphy.com/" pattern="https://giphy.com/embed/*" size="80" />
                        <p style={{ color: 'white' }}>Ou</p>
                        <input type="file" accept="image/*" />
                        <button>Ajouter</button>
                    </div>
                </div>
                <button>Envoyer</button>
            </form>
        </div>
    );
}

export default Post;