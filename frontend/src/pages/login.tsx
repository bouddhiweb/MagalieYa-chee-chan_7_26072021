import { useState } from 'react';
import Connect from '../constants/connection';
import '../style/main.scss';
import axios from "axios";
// @ts-ignore
import PropTypes from 'prop-types';
// @ts-ignore
import groupomania_white from '../assets/logo/icon-left-font-monochrome-white.svg';


const Login = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [emailNewAccount, setEmailNewAccount] = useState("");
    const [password, setPassword] = useState("");
    const [passwordNewAccount, setPasswordNewAccount] = useState("");

    const validateForm = () => {
        return email.length > 5 && password.length > 5;
    }

    const handleSubmit = (e:any) => {
        sessionStorage.clear();
        e.preventDefault();
        let userData = {
            email: email.toLowerCase(),
            password: password
        }
        Connect(userData);
    }

    const handleNewAccount = (e:any) => {
        sessionStorage.clear();
        e.preventDefault();
        let newUserData = {
            username: username,
            email: emailNewAccount.toLowerCase(),
            password: passwordNewAccount
        }

        const CREATE_ACCOUNT_URL = 'http://localhost:3000/auth/signup';
        axios
            .post(CREATE_ACCOUNT_URL, newUserData)
            .then((res) => {
                alert("Félicitation ! Ton compte a été créé !");
                setTimeout(() => {
                    Connect(newUserData);
                    // document.location.reload()
                }, 5000);
            })
            .catch((err) => {
                alert("erreur : " + err)
            });

    }

    return (
        <div className='darkTheme' >
            <form id='login' method="POST" className='darkTheme__form' onSubmit={handleSubmit}>
                <img className='logo--groupomania' src={groupomania_white} alt="Logo Groupomania"/>

                <label>Adresse email :</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                <label>Mot de passe :</label>
                <input type="password"
                       name="password"
                       placeholder="Mot de passe"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>

                <button className='action-button' type="submit" disabled={!validateForm()}>Connexion</button>
                <a className='white-text__link' href="#new-member">Je n'ai pas encore de compte</a>
            </form>

            <form id='new-member' method="POST" className='darkTheme__form' onSubmit={handleNewAccount}>
                <img className='logo--groupomania' src={groupomania_white} alt="Logo Groupomania"/>

                <label>Nom utilisateur :</label>
                <input
                    type="text"
                    name="text"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />

                <label>Adresse email :</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={emailNewAccount}
                    onChange={(e) => setEmailNewAccount(e.target.value)} />


                <label>Mot de passe :</label>
                <input type="password"
                       name="password"
                       placeholder="Mot de passe"
                       value={passwordNewAccount}
                       onChange={(e) => setPasswordNewAccount(e.target.value)}/>

                <button className='action-button' type="submit" disabled={!validateForm()}>S'inscrire</button>
                <a className='white-text__link' href="#login">J'ai déjà un compte</a>

            </form>
        </div>

    );
}
Login.propTypes = {setToken: PropTypes.func.isRequired};
export default Login;