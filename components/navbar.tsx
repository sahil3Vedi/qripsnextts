// REACT
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useCartContext } from '../context/cart'
// NEXT
import Link from 'next/link'
// ANT
import { Drawer, Menu, Avatar, Affix, Badge } from 'antd'
import { MenuOutlined, ShoppingOutlined, SmileOutlined  } from '@ant-design/icons'
const { SubMenu } = Menu
// IMAGES
//import imageModule from '../types/images'
const logoImage = require('../images/qripstranspwhite.png')
const emptyCartImage = require('../images/emptyCart.svg')
// CSS
import navbarStyles from '../stylesheets/navbar.module.css'
const navbarAvatarIconStyle = {display: "flex",justifyContent: "center",alignItems: "center",fontSize: "30px",marginTop: "5px"}

const Navbar = forwardRef(({}, ref: any) => {

    const { cart }: any = useCartContext()

    const [menuVisible, setMenuVisible] = useState(false)
    const [cartVisible, setCartVisible] = useState(false)
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
            <Affix>
            <div className={navbarStyles.navbarTop}>
                <div className={navbarStyles.navbarIconDiv} onClick={()=>setMenuVisible(true)}><MenuOutlined/></div>
                <div className={navbarStyles.navbarLogoDiv}><img className={navbarStyles.navbarLogo} src={logoImage}/></div>
                <div className={navbarStyles.navbarIconDiv} onClick={()=>setCartVisible(true)}><Badge count={cart.length}><ShoppingOutlined className={navbarStyles.navbarIcon}/></Badge></div>
            </div>
            </Affix>
            <Drawer placement="left" closable={false} onClose={()=>setMenuVisible(false)} visible={menuVisible}>
                <div className={navbarStyles.navbarProfile}>
                    <div className={navbarStyles.navbarAvatar}><Avatar size={40} icon={<SmileOutlined rotate={-23} style={navbarAvatarIconStyle}/>} style={{ color: '#008000', backgroundColor: 'rgb(246, 255, 237)' }}/></div>
                    <div className={navbarStyles.navbarProfileDescription}>
                        <div><p className={navbarStyles.navbarProfileSalutation}>Hi!</p></div>
                        <div><p className={navbarStyles.navbarProfileLogin}><Link href="/login"><b style={{color:"white",cursor:"pointer"}} onClick={()=>setMenuVisible(false)}>Login</b></Link> to Qrips</p></div>
                    </div>
                </div>
                <Menu onClick={()=>setMenuVisible(false)} style={{ width: 256 }} defaultSelectedKeys={[currentMenu==="/" ? "/home" : currentMenu]} mode="inline">
                    <Menu.Item key="/home"><Link href="/home">Home</Link></Menu.Item>
                    <SubMenu key="sub2" title="Plant Based Dairy">
                        <Menu.Item key="/products/cheese"><Link href="/products/cheese">Cheese</Link></Menu.Item>
                        <Menu.Item key="/products/milk"><Link href="/products/milk">Milk</Link></Menu.Item>
                        <Menu.Item key="/products/butter"><Link href="/products/butter">Butter</Link></Menu.Item>
                        <Menu.Item key="/products/tofu"><Link href="/products/tofu">Tofu</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title="Plant Based Meat">
                        <Menu.Item key="/products/frozen meat"><Link href="/products/frozen meat">Frozen</Link></Menu.Item>
                        <Menu.Item key="/products/non frozen meat"><Link href="/products/non frozen meat">Non Frozen</Link></Menu.Item>
                        <Menu.Item key="/products/poultry"><Link href="/products/poultry">Poultry</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" title="Body Care">
                        <Menu.Item key="8">Hair Care</Menu.Item>
                        <Menu.Item key="9">Body Wash</Menu.Item>
                        <Menu.Item key="10">Skin Care</Menu.Item>
                        <Menu.Item key="11">Cosmetics</Menu.Item>
                        <Menu.Item key="12">Perfumes</Menu.Item>
                        <Menu.Item key="13">Hygiene</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" title="Nutrition">
                        <Menu.Item key="14">Bars</Menu.Item>
                        <Menu.Item key="15">Protein Powder</Menu.Item>
                        <Menu.Item key="16">Supplements</Menu.Item>
                        <Menu.Item key="17">Seeds</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub6" title="Grocery">
                        <Menu.Item key="18">Tea</Menu.Item>
                        <Menu.Item key="19">Coffee</Menu.Item>
                        <Menu.Item key="20">Oil</Menu.Item>
                        <Menu.Item key="21">Beverages</Menu.Item>
                        <Menu.Item key="22">Sauces</Menu.Item>
                        <Menu.Item key="23">Snacks</Menu.Item>
                        <Menu.Item key="24">Dry Fruits</Menu.Item>
                        <Menu.Item key="25">Sugar</Menu.Item>
                        <Menu.Item key="26">Salt</Menu.Item>
                        <Menu.Item key="27">Spices</Menu.Item>
                        <Menu.Item key="28">Cereal</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub7" title="Chocolates">
                        <Menu.Item key="29">Powder</Menu.Item>
                        <Menu.Item key="30">Sugar Free</Menu.Item>
                        <Menu.Item key="31">Bars</Menu.Item>
                        <Menu.Item key="32">Spread</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub8" title="Bakery">
                        <Menu.Item key="33">Cookies</Menu.Item>
                        <Menu.Item key="34">Biscuits</Menu.Item>
                        <Menu.Item key="35">Powder</Menu.Item>
                        <Menu.Item key="36">Butter</Menu.Item>
                        <Menu.Item key="37">Sugar</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/help">Help</Menu.Item>
                    <Menu.Item key="/about"><Link href="/about">About</Link></Menu.Item>
                    <Menu.Item key="/legal">Legal</Menu.Item>
                </Menu>
            </Drawer>
            <Drawer placement="right" closable onClose={()=>setCartVisible(false)} visible={cartVisible} title="Your Cart">
                <div className={navbarStyles.emptyCartWrapper}>
                    <img src={emptyCartImage} className={navbarStyles.emptyCartImage}/>
                    <p>Your Cart Is Empty</p>
                    <a onClick={()=>setCartVisible(false)}>Back to Shop</a>
                </div>
            </Drawer>
        </div>
    )
})

export default Navbar
