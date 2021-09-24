let utils = require('../utils/jwtUtils');
const connection = require("../models/connection");

//Création d'un commentaire
exports.create = (req, res, next) => {
    console.log(req)
    try {
        const token = req.headers.authorization;
        const addComment = "INSERT INTO comments (id_user, id_post, body) VALUES (" + connection.escape(req.body.userId) + ", " + connection.escape(req.body.postId) + ", " + connection.escape(req.body.body) + ")";
        connection.connect((err) => {
            connection.query(addComment, (err, rows) => {
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
    console.log(req)
    try {
        const token = req.headers.authorization;
        let user = utils.getUser(token);
        if (user === undefined) {
            throw 'Token expiré ou inconnu'
        }
        let comments = "DELETE FROM comments WHERE id = " + connection.escape(req.body.commentId);
        if (!user.isAdmin) {
            comments+=" AND id_user = " + connection.escape(req.body.userId);
        }
        connection.connect((err) => {
            connection.query(comments, (err, result) => {
                if(result.affectedRows > 0) {
                    res.status(200).json({information : 'Commentaire supprimé'})
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

//Affichage de la liste des commentaire (ordre chronologique) d'un post/gif
exports.list = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        let user = utils.getUser(token);
        if (user === undefined) {
            throw 'Token expiré ou inconnu'
        }
        const comments = "SELECT c.id, c.id_user, c.id_post, c.body, c.created, u.username \n" +
            "FROM comments c\n" +
            "INNER JOIN users u ON c.id_user = u.id\n" +
            "WHERE c.id_post =" + connection.escape(req.body.postId) +
            " ORDER BY created DESC ";
        connection.connect((err) => {
            connection.query(comments, (err, rows) => {

                let comments = [];
                for (let i = 0; i < rows.length; i++) {
                    comments.push(rows[i])
                    // console.log(comments)
                }
                res.status(200).json(comments)
            })
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}
