// REACT
import React, {useRef, useState} from 'react'
// COMPONENTS
import Navbar from '../components/navbar'
import GlobalStyle from '../stylesheets/globalStyle'
import Footer from '../components/footer'
// CSS
import homeStyles from '../stylesheets/home.module.css'
// ANT
import { Select, Spin } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
// AXIOS
import axios from 'axios'

interface SearchValue{
    label: string;
    value: string;
}

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

const getCategoryDiv = (d: any) => {
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
    const [searchLoading, setSearchLoading] = useState(false)
    const [searchOptions, setSearchOptions] = useState<SearchValue[]>([])
    const [searchValue, setSearchValue] = useState("")
    const navbarRef = useRef<any>()

    const openMenu = () => {
        navbarRef['current']!.openMenu()
    }

    const handleSearch = (value) => {
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND}dummy/search`,{val: value ? value : " "})
        .then(res=>{
            let resOptions = []
            for(var prod in res.data.message){
                let prodInst = res.data.message[prod]
                let prodObj = {value:`${prodInst.company} ${prodInst.name} `,text:`${prodInst.company} ${prodInst.name} `}
                resOptions.push(prodObj)
            }
            console.log(resOptions)
            setSearchOptions(resOptions)
        })
    }

    console.log(searchOptions)

    return (
        <div>
            <GlobalStyle/>
            <div className="pageWrapper">
                <Navbar ref={navbarRef}/>
                <div className="pageContent">
                    <Select suffixIcon={<SearchOutlined />} allowClear showSearch onSearch={handleSearch} value={searchValue ? searchValue : null} placeholder={"Search From 1000+ Products"} style={{width: "100%", marginBottom: "20px"}} defaultActiveFirstOption={false} filterOption={false} notFoundContent={searchLoading ? <Spin size="small" /> : null} options={searchOptions}/>
                    <p className="pageTitle primaryColorUnderline">100% Vegan</p>
                    <div className={homeStyles.homeCategories}>{home_categories.map(d=>getCategoryDiv(d))}</div>
                    <div className={homeStyles.homeLink}><a onClick={openMenu}>Explore More Categories</a></div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default IndexPage
