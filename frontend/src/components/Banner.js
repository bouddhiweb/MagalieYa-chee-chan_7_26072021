import '../style/main.scss'
import logo from '../assets/vagues.svg';


function Banner() {
    return (
        <div className='darkTheme darkTheme__flexContainer'>
            <h1 className='darkTheme__title'>Vibes</h1>
            <img src={logo} alt="vibes logo" className='logo'></img>
        </div>
    )
}

export default Banner