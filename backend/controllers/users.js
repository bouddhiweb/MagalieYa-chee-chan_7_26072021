const { validationResult} = require("express-validator");
const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require("../models/connection");
const app = express();
const bodyParser = require("body-parser");
const utils = require("../utils/jwtUtils");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enregistre un nouvel utilisateur
exports.signup = async (req, res, next) => {
    // Password is not acceptable
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/.test(req.body.password)) {   // Test password strength
        return res.status(401).json({ error: 'Le mot de passe doit contenir une lettre majuscule, une minuscule et au moins 1 chiffre (6 caractères min)' });
    } else {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const userForm = {
                    username: req.body.username,
                    email: req.body.email,
                    password: hash
                }
                try {
                    const checkDB ="SELECT email FROM users WHERE email=" + connection.escape(userForm.email);
                    const addUser = "INSERT INTO users (username, email, password) values (" + connection.escape(userForm.username) + ", " + connection.escape(userForm.email) + ", '" + hash + "')";
                    connection.connect((err) => {
                        connection.query(checkDB,(err,rows) => {
                            const user = rows[0];
                            // console.log(rows);
                            // console.log(user);
                            if(user === undefined) {
                                connection.query(addUser,(err,rows) => {
                                    res.status(201).json({
                                        message: 'Enregistré !'
                                    })
                                });
                            } else {
                                res.status(400).json({
                                    error:'Adresse email déjà enregistré !'
                                })
                            }
                        });
                    });
                } catch (e)  {
                    res.status(500).json({
                        error: e
                    })
                }
            })
    }
};

// Retrouve un utilisateur existant
exports.login = (req, res, next) => {
    try {
        const emailQuery ="SELECT id, username, email, password, isAdmin FROM users WHERE email=" + connection.escape(req.body.email);
        connection.connect((err) => {
            connection.query(emailQuery,(err,rows) => {
                const user = rows[0];
                if (user === undefined) {
                    return res.status(400).json({
                        error: 'Identifiant incorrect !'
                    });
                } else {
                    const passwordForm = req.body.password;
                    const passwordDB = user.password;
                    const pwdCheck = bcrypt.compareSync(passwordForm, passwordDB);
                    if (pwdCheck) {
                        // console.log(user);
                        res.status(200).json({
                            role: user.isAdmin,
                            username:user.username,
                            userId: user.id,
                            token: jwt.sign(
                                {
                                    userId: user.id,
                                    username: user.username,
                                    isAdmin: user.isAdmin
                                },
                                process.env.TOKEN_SECRET,
                                {
                                    expiresIn: '24h',
                                }
                            )
                        })

                    } else {
                        return res.status(400).json({
                            error: 'Mot de passe erroné !'
                        });
                    }
                }
            })
        });
    } catch (e)  {
        res.status(500).json({
            error: e
        })
    }
};

//Liste des utilisateurs
exports.userlist = (req, res, next) => {
    try {
        const userlist ="SELECT id, username, email, isAdmin FROM users";
        connection.connect((err) => {
            connection.query(userlist,(err,rows) => {
                const users = [];
                for (let i = 0; i < rows.length; i++) {
                    users.push(rows[i])
                }
                res.status(200).json(users)
            })
        });
    } catch (e)  {
        res.status(500).json({
            error: e
        })
    }
};

//Changement de mot de passe
exports.delete = (req, res, next) => {
    // console.log(req.body)
    try {
        const token = req.headers.authorization;
        let user = utils.getUser(token);
        if (user === undefined) {
            throw 'Token expiré ou inconnu'
        }
        const updatePwd ="DELETE from users WHERE id=" + connection.escape(req.body.userId);
        connection.connect((err) => {
            connection.query(updatePwd,(err,result) => {
                if(result.affectedRows > 0) {
                    res.status(200).json({information : 'Utilisateur supprimé'})
                } else {
                    res.status(400).json({error: 'Une erreur est survenue au moment de la suppression du compte.'})
                }
            })
        });
    } catch (e)  {
        res.status(500).json({
            error: e
        })
    }
};