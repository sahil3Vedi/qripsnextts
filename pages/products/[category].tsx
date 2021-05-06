// REACT
import React, { useState, useEffect } from 'react'
// NEXT
import { useRouter } from 'next/router'
// ANT
import { Button, Modal, Table, Spin, Space, message,Checkbox, Slider, Row, Col, Empty } from 'antd'
import { FilterOutlined, CloseCircleOutlined } from '@ant-design/icons'
// COMPONENTS
import Navbar from '../../components/navbar'
import GlobalStyle from '../../stylesheets/globalStyle'
import ItemPreview from '../../components/itemPreview'
// AXIOS
import axios from 'axios'
// CSS
import shelfStyles from '../../stylesheets/shelf.module.css'

const categoryMap = {
    "cheese":["Blocks","Shredded","Slices","Dips"]
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function capitalizeGroup(str) {
    return str ? str.split(' ').map(capitalize).join(' ') : ""
}

const Products = () => {

    const router = useRouter()
    const category = router.query.category
    const [currentRoute, setCurrentRoute] = useState('')
    const [loadingProducts, setLoadingProducts] = useState(true)
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    const [filterVisible, setFilterVisible] = useState(false)
    const [filterCategories, setFilterCategories] = useState([])
    const [filterCompanies, setFilterCompanies] = useState([])
    const [minFilterPrice, setMinFilterPrice] = useState(100)
    const [maxFilterPrice, setMaxFilterPrice] = useState(1500)
    const [categories, setCategories] = useState([])
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}dummy/fetchAll/${window.location.pathname.split('/')[2]}`)
        .then(res=>{
            let product_companies = res.data.message.map(d=>d.company).filter((v, i, a) => a.indexOf(v) === i)
            setLoadingProducts(true)
            setProducts(res.data.message)
            setFilteredProducts(res.data.message)
            setLoadingProducts(false)
            setCompanies(product_companies)
            setCategories(categoryMap[window.location.pathname.split('/')[2]] ? categoryMap[window.location.pathname.split('/')[2]] : [])
        })
        .catch(e=>{
            console.log(e)
        })
    }, [category])

    const handleFilterPrice = (value) => {
        setMinFilterPrice(value[0])
        setMaxFilterPrice(value[1])
    }

    const applyFilter = () => {
        let temp_products = []
        for (var product in products){
            let productInstance = products[product]
            if ( (productInstance.unit_price>=minFilterPrice) && (productInstance.unit_price<=maxFilterPrice) && (!filterCompanies.length || filterCompanies.includes(productInstance.company)) && (!filterCategories.length || filterCategories.some(i=>productInstance.tags.includes(i))) ){
                temp_products.push(productInstance)
            }
        }
        setFilteredProducts(temp_products)
        setFilterVisible(false)
        message.success("Filter Applied")
    }

    const clearFilter = () => {
        setFilteredProducts(products)
        message.success("Filter Removed")
    }

    const filter = (
        <Modal centered title="Filter Products" visible={filterVisible} onOk={()=>applyFilter()} onCancel={()=>setFilterVisible(false)}>
            <p className={shelfStyles.filterTypeTitle} style={{marginTop: 0}}>Category</p>
            <Checkbox.Group style={{ width: '100%' }} onChange={setFilterCategories}>
                {categories.map(d=><Row key={d}><Col><Checkbox value={d.toLowerCase()}>{d}</Checkbox></Col></Row>)}
            </Checkbox.Group>
            <p className={shelfStyles.filterTypeTitle}>Company</p>
            <Checkbox.Group style={{ width: '100%' }} onChange={setFilterCompanies}>
                {companies.map(d=><Row key={d}><Col><Checkbox value={d}>{d}</Checkbox></Col></Row>)}
            </Checkbox.Group>
            <p className={shelfStyles.filterTypeTitle}>Price</p>
            <Slider range step={100} defaultValue={[100, 1500]} min={100} max={1500} onChange={handleFilterPrice} tipFormatter={(value)=>`₹ ${value}`}/>
        </Modal>
    )

    return (
        <div>
            {filter}
            <GlobalStyle/>
            <Navbar/>
            <div className="pageContent">
                <p className="pageTitle">{capitalizeGroup(router.query.category)}</p>
                <div className={shelfStyles.filterDiv}>
                    <div>{products.length ? <Button type="primary" icon={<FilterOutlined/>} onClick={()=>setFilterVisible(true)}>Filter</Button> : null}</div>
                    <div></div>
                    <div>
                        {
                            products.length===filteredProducts.length
                            ?
                            null
                            :
                            <Button danger={true} type="primary" icon={<CloseCircleOutlined/>} onClick={()=>clearFilter()}>Clear Filter</Button>
                        }
                    </div>
                </div>
                {
                    loadingProducts ?
                    <div className="div-spinner"><Spin/></div>
                    :
                    (
                        filteredProducts.length ?
                        <div className={shelfStyles.shelf}>{filteredProducts.map(d=><ItemPreview key={d._id} data={d}/>)}</div>
                        :
                        <Empty className={shelfStyles.notFound} image={Empty.PRESENTED_IMAGE_SIMPLE} description={<p>No Products Found</p>}/>
                    )
                }
            </div>
        </div>
    )
}

export default Products
