import '../style/main.scss';
import {useEffect, useState} from "react";
import axios from "axios";

export default function ProfilPage() {
    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('role');
    const userId = sessionStorage.getItem('userId');
    let [data, setItems]:any = useState({});
    let [newPassword, setNewPassword]:any = useState({});
    const token:any = sessionStorage.getItem('token');
    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        const requestOptions:any = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/auth/userlist", requestOptions)
            .then(response => response.json())
            .then(result => {
                setItems(result)
            })
            .catch(error => console.log('error', error));
    }, []);



    const handleClick = () => {
        sessionStorage.clear();
        document.location.reload();
    }

    const handleUnsubscribe = (e:any) => {
        e.preventDefault();
        alert('Tu es sûr(e) de vouloir supprimer ton compte ?')
        let datas = {
            token: token,
            userId: userId,
        }

        const DELETE_ACCOUNT_URL = 'http://localhost:3000/auth/delete';
        axios
            .post(DELETE_ACCOUNT_URL , datas)
            .then((res) => {

                alert("Ton gif a bien été posté !");
            })
            .catch((err) => {

                alert("erreur : " + err)
            });

    }

    return(
        <div className='darkTheme--profilContainer'>

            <h1 className='feed__title'>Hello {username} !</h1>
            <p className='white-text'>Que souhaites-tu faire ?</p>
            <ul >
                <li><a className='white-text__link' href={'/index'} onClick={handleClick}>Me déconnecter</a></li>
                <li><a className='white-text__link' href={'/register'} onClick={handleUnsubscribe}>Me désinscrire</a></li>
            </ul>
            {role === '0' ? <p className='white-text'>Amuse toi bien !</p> :  <p className='white-text'>Tu as un statut Administrateur !</p> }

        </div>
    )
}
