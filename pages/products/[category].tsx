// REACT
import React, { useState, useEffect } from 'react'
// NEXT
import { useRouter } from 'next/router'
// ANT
import { Button, Modal, Table, Spin, Space, message } from 'antd'
// COMPONENTS
import Navbar from '../../components/navbar'
import GlobalStyle from '../../stylesheets/globalStyle'
import ItemPreview from '../../components/itemPreview'
// AXIOS
import axios from 'axios'
// CSS
import shelfStyles from '../../stylesheets/shelf.module.css'

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

    useEffect(() => {
        console.log(category)
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}dummy/fetchAll/${window.location.pathname.split('/')[2]}`)
        .then(res=>{
            setLoadingProducts(true)
            setProducts(res.data.message)
            setFilteredProducts(res.data.message)
            setLoadingProducts(false)
        })
        .catch(e=>{
            console.log(e)
        })
    }, [category])

    console.log(products)
    console.log(filteredProducts)
  return (
      <div>
          <GlobalStyle/>
          <Navbar/>
          <div className="pageContent">
              <p className="pageTitle">{capitalizeGroup(router.query.category)}</p>
              {
                loadingProducts ?
                <div className="div-spinner"><Spin/></div>
                :
                <div className={shelfStyles.shelf}>
                {
                    products.map(d=><ItemPreview key={d._id} data={d}/>)
                }
                </div>
            }
          </div>
      </div>
  )
}

export default Products
