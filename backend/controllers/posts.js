let utils = require('../utils/jwtUtils');
const connection = require("../models/connection");

//Création d'un post
exports.create = (req, res, next) => {
    try {
        //TODO:Si fichier => l'enregistrer avec multer + créer l'url /image/[nom fichier]
        const token = req.headers.authorization;
        const urlPattern = /(https:\/\/giphy\.com\/embed\/)(.*)/;
        const urlSubmitted = req.body.url;
        const addPost = "INSERT INTO gifs (id_user, title, url) VALUES (" + connection.escape(req.body.userId) + ", " + connection.escape(req.body.title) + ", " + connection.escape(req.body.url) + ")";

        if (urlSubmitted.match(urlPattern)) {
            connection.connect((err) => {
                connection.query(addPost, (err, rows) => {
                    let JSONgif = {
                        title:req.body.title,
                        postId:rows.insertId,
                        url: req.body.url,
                    }
                    res.status(200).json(JSONgif)
                })
            })
        } else {
            res.status(400).json({
                error: "L'URL doit commencer par https://giphy.com/embed"
            })
        }

    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

//Suppression d'un post
exports.delete = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        let user = utils.getUser(token);
        if (user === undefined) {
            throw 'Token expiré ou inconnu'
        }
        let posts = "DELETE FROM gifs WHERE id = " + connection.escape(req.body.postId);
        if (!user.isAdmin) {
            posts+=" AND id_user = " + connection.escape(user.id);
        }
        // console.log(posts);
        connection.connect((err) => {
            connection.query(posts, (err, result) => {
                // console.log(result);
                if(result.affectedRows > 0) {
                    res.status(200).json({information : 'Gif supprimé'})
                } else {
                    res.status(400).json({error: 'Une erreur est survenue au moment de la suppression.'})
                }
            })
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

//Affichage de la liste des gifs (ordre chronologique)
exports.list = (req, res, next) => {
    try {
        const posts = "SELECT g.id, g.id_user, g.title, g.url, g.created, u.username\n" +
            "FROM gifs g\n" +
            "INNER JOIN users u ON g.id_user = u.id\n" +
            "ORDER BY created DESC ";
        connection.connect((err) => {
            connection.query(posts, (err, rows) => {
                let posts = [];
                for (let i = 0; i < rows.length; i++) {
                    posts.push(rows[i])
                }
                // console.log(posts)
                res.status(200).json(posts)
            })
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}
