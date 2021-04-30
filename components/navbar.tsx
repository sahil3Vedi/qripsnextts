import { MenuOutlined, ShoppingOutlined } from '@ant-design/icons'
import logoImage from '../images/qripstranspwhite.png'
import navbarStyles from '../stylesheets/navbar.module.css'

const Navbar = () => {
    return <div className={navbarStyles.navbarTop}>
        <div className={navbarStyles.navbarIconDiv}><MenuOutlined/></div>
        <div className={navbarStyles.navbarLogoDiv}><img className={navbarStyles.navbarLogo} src={logoImage}/></div>
        <div className={navbarStyles.navbarIconDiv}><ShoppingOutlined/></div>
    </div>
}

export default Navbar
