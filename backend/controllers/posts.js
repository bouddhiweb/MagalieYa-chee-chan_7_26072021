let utils = require('../utils/jwtUtils');
const connection = require("../models/connection");
const jwt = require("jsonwebtoken");


//Création d'un post
exports.create = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token);
        const addPost = "INSERT INTO gifs (id_user, title, url) VALUES (" + connection.escape(req.body.id_user) + ", " + connection.escape(req.body.title) + ", " + connection.escape(req.body.url) + ")";
        connection.connect((err) => {
            connection.query(addPost, (err, rows) => {
                let user = utils.getUser(token);
                console.log(user);
                res.status(200).json('Gif enregistré !')
            })
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

//Suppression d'un post
exports.delete = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const posts = "DELETE FROM gifs WHERE id = " + connection.escape(req.body.id) + "AND" ;
        connection.connect((err) => {
            connection.query(posts, (err, rows) => {
                console.log(rows);
                const post = rows[0];
                res.status(200).json({
                    id: post.id,
                    id_user: post.id_user,
                    title: post.title,
                    url: post.url,
                    created: post.created
                })
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
        const posts = "SELECT g.id, g.id_user, g.title, g.url, g.created, u.username \n" +
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
