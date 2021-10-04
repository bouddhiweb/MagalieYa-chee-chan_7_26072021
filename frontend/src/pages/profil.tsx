import '../style/main.scss';
import axios from "axios";

export default function ProfilPage() {

    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('role');
    const userId = sessionStorage.getItem('userId');
    const token:any = sessionStorage.getItem('token');
    const DELETE_ACCOUNT_URL = 'http://localhost:3000/auth/delete';

    const handleClick = () => {
        sessionStorage.clear();
        setTimeout(() => document.location.reload(), 5000);
    }

    const handleUnsubscribe = (e:any) => {
        e.preventDefault();
        alert('Tu es sûr(e) de vouloir supprimer ton compte ?')
        let datas = {
            token: token,
            userId: userId,
        }

        axios
            .post(DELETE_ACCOUNT_URL , datas)
            .then((res) => {
                alert("Ton compte a bien été supprimé, A bientôt !");
                sessionStorage.clear();
                setTimeout(() => document.location.reload(), 5000);
            })
            .catch((err) => {

                alert("erreur : " + err.error)
            });
    }

    return(
        <div className='darkTheme--profilContainer'>

            <h1 className='feed__title'>Hello {username} !</h1>
            <p className='white-text'>Que souhaites-tu faire ?</p>
            <ul >
                <li><a className='white-text__link' href={'/index'} onClick={handleClick}>Me déconnecter</a></li>
                <li><a className='white-text__link' href={'/index'} onClick={handleUnsubscribe}>Me désinscrire</a></li>
            </ul>
            {role === '0' ? <p className='white-text'>Amuse toi bien !</p> :  <p className='white-text'>Tu as un statut Administrateur !</p> }

        </div>
    )
}
