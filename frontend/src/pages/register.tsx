import '../index.css';
// import groupomania_white from "../assets/logo/icon-left-font-monochrome-white.svg";
import {useState} from "react";

import Signup from "../constants/signup";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
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
            username:username,
            email: email.toLowerCase(),
            password: password
        }

        Signup(userData);
    }
    return (
        <div>
            <form method="POST" className='darkTheme__form' onSubmit={handleSubmit}>

                <label>Nom d'utilisateur :</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
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

                <button className='action-button'  type="submit" disabled={!validateForm()}>S'enregistrer</button>
            </form>
        </div>
    );
}

