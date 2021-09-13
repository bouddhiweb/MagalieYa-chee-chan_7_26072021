let utils = require('../utils/jwtUtils');
const connection = require("../models/connection");
const jwt = require("jsonwebtoken");


//Création d'un commentaire
exports.create = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token);
        const addPost = "INSERT INTO comments (id_user, body) VALUES (" + connection.escape(req.body.id_user) + ", " + connection.escape(req.body.body) + ")";
        connection.connect((err) => {
            connection.query(addPost, (err, rows) => {
                let user = utils.getUser(token);
                console.log(user);
                res.status(200).json('Commentaire enregistré !')
            })
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

//Suppression d'un commentaire
exports.delete = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let user = utils.getUser(token);
        let comments = "DELETE FROM comments WHERE id = " + connection.escape(req.body.id);
        if (!user.isAdmin) {
            comments+=" AND id_user = " + connection.escape(user.id);
        }
        connection.connect((err) => {
            connection.query(comments, (err, rows) => {
                console.log(rows);
                const comment = rows[0];
                res.status(200).json({
                    id: comment.id,
                    id_user: comment.id_user,
                    body: comment.body,
                    created: comment.created
                })
            })
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

//Affichage de la liste des commentaire (ordre chronologique) d'un post/gif

// A revoir pour les jointures
exports.list = (req, res, next) => {
    try {
        const comments = "SELECT g.id, g.id_user, g.title, g.url, g.created, u.username \n" +
            "FROM gifs g\n" +
            "INNER JOIN users u ON g.id_user = u.id\n" +
            "ORDER BY created DESC ";
        connection.connect((err) => {
            connection.query(posts, (err, rows) => {
                let posts = [];
                for (let i = 0; i < rows.length; i++) {
                    posts.push(rows[i])
                }
                res.status(200).json(posts)
            })
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}
