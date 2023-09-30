import './MainPageToolBar.css';
import Logo from '../../assets/icons/LogoLetrasConFondo.png'
function MainPageToolBar(){
    return (
        <div className='MainPageToolBar'>
            <div className='MainPageToolBar-LeftDiv'>
                <img src={Logo} alt="Logo" className='MainPageToolBar-Logo' />
            </div>
            <div className='MainPageToolBar-MidDiv'>
                <span>Afiliate</span>
                <span>Sobre Nosotros</span>
                <span>Contacto</span>
            </div>
            <div className='MainPageToolBar-RightDiv'>  
                <span>Login</span>
                <span>or</span>
                <span>Register</span>
            </div>
        </div>
    );

}
export default MainPageToolBar;