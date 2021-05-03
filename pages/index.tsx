// REACT
import React, {useRef, useState} from 'react'
// NEXT
import Link from 'next/link'
// COMPONENTS
import Navbar from '../components/navbar'
import GlobalStyle from '../stylesheets/globalStyle'
// CSS
import homeStyles from '../stylesheets/home.module.css'

const home_categories = [
    {color:"#FFEDBB",name:"Cheese",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/10289/cheese.svg'},
    {color:"#FFC6C6",name:"Sauces",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/244467/sauce.svg'},
    {color:"#D2E7FF",name:"Milk",link:"plant-based-milk",svgurl:'https://www.svgrepo.com/show/113426/milk-bottle.svg'},
    {color:"#FFC6C6",name:"Skincare",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/123846/cosmetics.svg'},
    {color:"#E8FFC6",name:"Beverages",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/285923/drink-soft-drink.svg'},
    {color:"#FFEDBB",name:"Unfrozen Meat",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/297199/sausage.svg'},
    {color:"#FFC6C6",name:"Frozen Meat",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/297209/meat.svg'},
    {color:"#FFEDBB",name:"Cosmetics",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/299829/cosmetics-ointment.svg'},
    {color:"#FFEDBB",name:"Tofu",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/85280/tofu.svg'},
    {color:"#E8FFC6",name:"Dry Fruits",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/196387/hazelnuts-almond.svg'},
    {color:"#FFEDBB",name:"Biscuits",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/186236/cookie.svg'},
    {color:"#D2E7FF",name:"Butter",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/276537/butter-butter.svg'}
]

const getCategoryDiv = (d) => {
    let svgurl = d.svgurl
        return (
        <div key={d.name}>
            <div style={{backgroundColor:d.color}} className={homeStyles.homeCategory}>
                <img src={svgurl} className={homeStyles.homeCategoryImage} alt="product-category"/>
            </div>
            <p>{d.name}</p>
        </div>
    )
}

const IndexPage = () => {
    const navbarRef = useRef()
    console.log(navbarRef)
    return (
        <div>
            <GlobalStyle/>
            <Navbar ref={navbarRef}/>
            <div className="pageContent">
                <p className="pageTitle">100% Vegan</p>
                <div className={homeStyles.homeCategories}>{home_categories.map(d=>getCategoryDiv(d))}</div>
                <div className={homeStyles.homeLink}><a onClick={()=>navbarRef.current.openMenu()}>Explore More Categories</a></div>
            </div>
        </div>
    )
}

export default IndexPage
