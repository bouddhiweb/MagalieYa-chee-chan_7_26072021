import '../style/main.scss';
import { FaHome, FaSignOutAlt, FaUserAstronaut } from 'react-icons/fa';
import {ROUTES} from "../constants/routes";

const LateralBar = () => {
    const handleClick = () => {
        sessionStorage.clear();
        setTimeout(() => document.location.reload(), 5000);
    }
        const menuItems = [
            {
                name: 'Vibes',
                icon: <FaHome/>,
                path: ROUTES.index
            },
            {
                name: 'Mon profil',
                icon: <FaUserAstronaut/>,
                path: ROUTES.profil
            },
            {
                name: 'Déconnexion',
                icon: <FaSignOutAlt/>,
                onClick: handleClick,
                path: ROUTES.index
            },
        ]

        return (
            <div className='darkTheme__flexContainer'>
                <div className='darkTheme darkTheme__lateralBar'>
                    <ul className='darkTheme darkTheme__lateralBar__menuItems'>
                        {menuItems.map((item) => (
                            <li className='icons'><a href={item.path} onClick={item.onClick}>{item.icon}</a></li>
                        ))}
                    </ul>
                </div>
                {/*<div className='darkTheme darkTheme__lateralBar--salonBar'>*/}
                {/*    <h2>Utilisateurs</h2>*/}
                {/*</div>*/}
            </div>
        )
    }

    export default LateralBar