// REACT
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
// NEXT
import Link from 'next/link'
// ANT
import { Drawer, Menu } from 'antd'
import { MenuOutlined, ShoppingOutlined } from '@ant-design/icons'
// IMAGES
import logoImage from '../images/qripstranspwhite.png'
// CSS
import navbarStyles from '../stylesheets/navbar.module.css'

const Navbar = forwardRef((props, ref) => {

    const [menuVisible, setMenuVisible] = useState(false)
    const [currentMenu, setCurrentMenu] = useState("")
    
    useEffect(() => {
        setCurrentMenu(window.location.pathname)
    }, [])

    useImperativeHandle(ref, () => ({
        openMenu() {
            setMenuVisible(true)
        }
    }))

    return(
        <div>
            <div className={navbarStyles.navbarTop}>
                <div className={navbarStyles.navbarIconDiv} onClick={()=>setMenuVisible(true)}><MenuOutlined/></div>
                <div className={navbarStyles.navbarLogoDiv}><img className={navbarStyles.navbarLogo} src={logoImage}/></div>
                <div className={navbarStyles.navbarIconDiv}><ShoppingOutlined/></div>
            </div>
            <Drawer placement="left" closable={false} onClose={()=>setMenuVisible(false)} visible={menuVisible}>
                <Menu onClick={()=>setMenuVisible(false)} style={{ width: 256 }} defaultSelectedKeys={[currentMenu]} mode="inline">
                    <Menu.Item key="/home"><Link href="/home">Home</Link></Menu.Item>
                    <Menu.Item key="/about"><Link href="/about">About</Link></Menu.Item>
                </Menu>
            </Drawer>
        </div>
    )
})

export default Navbar
