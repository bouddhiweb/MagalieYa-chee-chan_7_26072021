import  { useState } from 'react';
import Connect from '../constants/connection';
// @ts-ignore
import PropTypes from 'prop-types';
// @ts-ignore
import groupomania_white from '../assets/logo/icon-left-font-monochrome-white.svg';
import '../style/main.scss';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateForm = () => {
        return email.length > 5 && password.length > 5;
    }
// @ts-ignore
    const handleSubmit = e => {
        sessionStorage.clear();
        e.preventDefault();
        let userData = {
            email: email.toLowerCase(),
            password: password
        }
        Connect(userData);
         document.location.reload()
    }
    return (
        <div className='darkTheme'>
            <form method="POST" className='darkTheme__form' onSubmit={handleSubmit}>
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
            </form>
        </div>

    );
}
Login.propTypes = {setToken: PropTypes.func.isRequired};
export default Login;