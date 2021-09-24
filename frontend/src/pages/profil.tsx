import '../style/main.scss';
import {useEffect, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import {changePwd} from "../constants/usersManager";

export default function ProfilPage() {
    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('role');
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

    const handleNewPassword = (e:any) => {
        setNewPassword(e.target.value);
    }
    const handleSubmit = (e:any) => {
        e.preventDefault();
        let datas = {
            token: token,
            userId: e.currentTarget.id,
            newPassword: newPassword,
        }
        changePwd(datas);
        e.target.reset();
    }

    const handleClick = () => {
        sessionStorage.clear();
        document.location.reload();
    }

    const handleUnsubscribe = () => {

    }

    const usersId:any = [];
    for(let i = 0; i < data.length; i++) {
        usersId.push(i);
    }

    const usersList = usersId.map((userId:string) =>
        /* Itération des posts */
        <tbody>
        <tr>
            <td>{data[userId].username}</td>
            <td>{data[userId].email}</td>
            <td>{data[userId].isAdmin === 1 ? 'Admin' : 'Utilisateur'}</td>
            <td>Supprimer</td>
            <td>Nouveau mot de passe : <form id={data[userId].id} onSubmit={handleSubmit}><input onInput={handleNewPassword} type="text"/>
                <IconButton type="submit" className="Mui-focused" aria-label="add a comment">
                    <SendIcon />
                </IconButton>
            </form></td>
        </tr>
        </tbody>

    );

    return(
        <div className='feed__box'>

            <h1 className='feed__title'>Hello {username} !</h1>
            <p>Que souhaites-tu faire ?</p>
            <ul>
                <li><a href={'/login'} onClick={handleClick}>Me déconnecter</a></li>
                <li><a href={'/register'} onClick={handleUnsubscribe}>Me désinscrire</a></li>
            </ul>
            {role === '0' ? <p>Amuse toi bien !</p> :  <div>
                <h2>Gestion des utilisateur</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Liste des utilisateurs</th>
                    </tr>
                    <tr>
                        <th>Noms</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th colSpan={2}>Modération</th>
                    </tr>
                    </thead>
                    {usersList}
                </table>
            </div> }

        </div>
    )
}
