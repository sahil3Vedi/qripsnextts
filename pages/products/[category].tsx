// REACT
import React, { useState, useEffect } from 'react'
// NEXT
import { useRouter } from 'next/router'
// ANT
import { Button, Modal, Spin, message, Checkbox, Slider, Row, Col, Empty, Pagination } from 'antd'
import { FilterOutlined, CloseCircleOutlined } from '@ant-design/icons'
// COMPONENTS
import Navbar from '../../components/navbar'
import GlobalStyle from '../../stylesheets/globalStyle'
import ItemPreview from '../../components/itemPreview'
import Footer from '../../components/footer'
// AXIOS
import axios from 'axios'
// CSS
import shelfStyles from '../../stylesheets/shelf.module.css'

const categoryMap: any = {
    "cheese":["Blocks","Shredded","Slices","Dips"],
    "milk":["Soy Milk","Almond Milk","Cashew Milk","Coconut Milk","Flax Milk","Hemp Milk","Oat Milk","Rice Milk"],
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function capitalizeGroup(str: any) {
    return str ? str.split(' ').map(capitalize).join(' ') : ""
}

interface Prod{
    name: string,
    color: string,
    company: string,
    tags: string[],
    unit_price: number,
    unit_weight: number,
    imgs: string[],
    _id: string,
    description: string
}

const Products = () => {

    const router = useRouter()
    const category = router.query.category
    const [loadingProducts, setLoadingProducts] = useState(true)
    const [products, setProducts] = useState<Prod[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Prod[]>([])

    const [filterVisible, setFilterVisible] = useState(false)
    const [filterCategories, setFilterCategories] = useState<any[]>([])
    const [filterCompanies, setFilterCompanies] = useState<any[]>([])
    const [minFilterPrice, setMinFilterPrice] = useState(100)
    const [maxFilterPrice, setMaxFilterPrice] = useState(1500)
    const [categories, setCategories] = useState<string[]>([])
    const [companies, setCompanies] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        setProducts([])
        setFilteredProducts([])
        setLoadingProducts(true)
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}dummy/fetchAll/${window.location.pathname.split('/')[2]}`)
        .then(res=>{
            let product_companies = res.data.message.map((d: any)=>d.company).filter((v: any, i: any, a: any) => a.indexOf(v) === i)
            setProducts(res.data.message)
            setFilteredProducts(res.data.message)
            setLoadingProducts(false)
            setCompanies(product_companies)
            setCategories(categoryMap[window.location.pathname.split('/')[2]] ? categoryMap[window.location.pathname.split('/')[2]] : [])
            setCurrentPage(1)
        })
        .catch(e=>{
            console.log(e)
        })
    }, [category])

    const handleFilterPrice = (value: any) => {
        setMinFilterPrice(value[0])
        setMaxFilterPrice(value[1])
    }

    const applyFilter = () => {
        setCurrentPage(1)
        let temp_products: Prod[] = []
        for (var product in products){
            let productInstance: Prod = products[product]
            if (
                (productInstance['unit_price']>=minFilterPrice) &&
                (productInstance['unit_price']<=maxFilterPrice) &&
                (!(filterCompanies || []).length || (filterCompanies!.includes(productInstance['company']))) &&
                (!filterCategories.length || filterCategories.some(i=>productInstance['tags'].includes(i)))
               ){
                temp_products.push(productInstance)
            }
        }
        setFilteredProducts(temp_products)
        setFilterVisible(false)
        window.scrollTo(0, 0)
        message.success("Filter Applied")
    }

    const clearFilter = () => {
        setFilteredProducts(products)
        window.scrollTo(0, 0)
        setCurrentPage(1)
        message.success("Filter Removed")
    }

    const filter = (
        <Modal centered title="Filter Products" visible={filterVisible} onOk={()=>applyFilter()} onCancel={()=>setFilterVisible(false)} okText="Apply">
            {
                categories.length ?
                <div>
                    <p className={shelfStyles.filterTypeTitle} style={{marginTop: 0}}>Category</p>
                    <Checkbox.Group style={{ width: '100%' }} onChange={setFilterCategories}>
                        {categories.map(d=><Row key={d}><Col><Checkbox value={d.toLowerCase()}>{d}</Checkbox></Col></Row>)}
                    </Checkbox.Group>
                </div>
                :
                null
            }
            <p className={shelfStyles.filterTypeTitle}>Company</p>
            <Checkbox.Group style={{ width: '100%' }} onChange={setFilterCompanies}>
                {companies.map(d=><Row key={d}><Col><Checkbox value={d}>{d}</Checkbox></Col></Row>)}
            </Checkbox.Group>
            <p className={shelfStyles.filterTypeTitle}>Price</p>
            <Slider range step={100} defaultValue={[100, 1500]} min={100} max={1500} onChange={handleFilterPrice} tipFormatter={(value)=>`₹ ${value}`}/>
        </Modal>
    )

    const updatePage = (value: number) => {
        window.scrollTo(0, 0)
        setCurrentPage(value)
    }


    return (
        <div>
            {filter}
            <GlobalStyle/>
            <div className="pageWrapper">
                <Navbar/>
                <div className="pageContent">
                    <div className={shelfStyles.shelfWrapper}>
                        <div><p className="pageTitle primaryColorUnderline">{capitalizeGroup(router.query.category)}</p></div>
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
                        <div className={shelfStyles.shelfContainer}>
                            {
                                loadingProducts ?
                                <div className="div-spinner"><Spin/></div>
                                :
                                (
                                    filteredProducts.length ?
                                    <div className={shelfStyles.shelfBody}>
                                        <div><div className={shelfStyles.shelf}>
                                            {filteredProducts.slice((currentPage-1)*10, (currentPage)*10).map(d=><ItemPreview key={d._id} data={d}/>)}
                                        </div></div>
                                        <div className={shelfStyles.paginationDiv}>
                                            <Pagination current={currentPage} total={filteredProducts.length + 1} onChange={updatePage}/>
                                        </div>
                                    </div>
                                    :
                                    <Empty className={shelfStyles.notFound} image={Empty.PRESENTED_IMAGE_SIMPLE} description={<p>No Products Found</p>}/>
                                )
                            }
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default Products
