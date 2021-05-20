// REACT
import React, { useState, useEffect } from 'react'
import { useCartContext } from '../../context/cart'
// NEXT
import { useRouter } from 'next/router'
// ANT
import { Spin, Carousel, Button } from 'antd'
import { LeftOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons'
// COMPONENTS
import Navbar from '../../components/navbar'
import GlobalStyle from '../../stylesheets/globalStyle'
import Footer from '../../components/footer'
// AXIOS
import axios from 'axios'
// CSS
import productStyles from '../../stylesheets/product.module.css'

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

const Product = () => {
    const [prodCount, setProdCount] = useState(0)
    const { cart }: any = useCartContext()
    const { addToCart }: any = useCartContext()
    const { removeFromCart }: any = useCartContext()
    const addProd = () => addToCart(productInfo._id, productInfo.name, productInfo.company, productInfo.imgs[0], productInfo.unit_price)
    const removeProd = () => removeFromCart(productInfo._id)

    const router = useRouter()
    const product = router.query.prod
    const [productInfo, setProductInfo] = useState<Prod>({} as Prod)
    const [loadingProduct, setLoadingProduct] = useState(true)

    useEffect(()=>{
        // Effect Handler for Updating Cart Context
        let temp_count = 0
        for (var prod in cart){
            if (productInfo._id === cart[prod].id){
                temp_count = cart[prod].qty
            }
        }
        setProdCount(temp_count)
    },[productInfo, cart, product])

    useEffect(() => {
        setLoadingProduct(true)
        // Effect Handler for Fetching Product Info
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}dummy/fetchAll/${window.location.pathname.split('/')[2]}`)
        .then(res=>{
            setProductInfo(res.data.message[0])
            setLoadingProduct(false)
        })
        .catch(e=>{
            console.log(e)
        })
    }, [product])

    console.log(productInfo)

    return (
        <div>
            <GlobalStyle/>
            <div className="pageWrapper">
                <Navbar/>
                <div className="pageContent">
                    {
                        loadingProduct ?
                        <div className="div-spinner"><Spin/></div>
                        :
                        <div className={productStyles.productInfo}>
                            <div className={productStyles.productWeightPricing}>
                                <div><Button icon={<LeftOutlined />} className={productStyles.goBack} onClick={() => router.back()}>Go Back</Button></div>
                                <div></div>
                                <div><Button size="large" type="link" className={productStyles.goBack}>In Stock</Button></div>
                            </div>
                            <Carousel autoplay={false}>
                                {productInfo.imgs.map(d=><div key={d} className={productStyles.carouselDiv}>
                                    <img src={d} className={productStyles.productImage}/>
                                </div>)}
                            </Carousel>
                            <h2 className={productStyles.productCompany}>{productInfo.company}</h2>
                            <h1 className={productStyles.productName}>{productInfo.name}</h1>
                            <div className={productStyles.productWeightPricing}>
                                <div><p>&#x20B9;{productInfo.unit_price}</p></div>
                                <div></div>
                                <div><p>{productInfo.unit_weight}g</p></div>
                            </div>
                            <p className={productStyles.productDescription}>{productInfo.description}</p>
                            <div className={productStyles.btnWrapper}>
                                <div>{prodCount ? <Button shape="circle" icon={<MinusOutlined/>} className={productStyles.btnMinus} type="primary" danger onClick={removeProd}/> : null}</div>
                                <div>{prodCount ? <p className={productStyles.cartValue}>{prodCount}</p> : <Button className={productStyles.btnAddToCart} onClick={addProd}>Add to Cart</Button>}</div>
                                <div>{prodCount ? <Button shape="circle" icon={<PlusOutlined/>} className={productStyles.btnPlus} type="primary" onClick={addProd}/> : null}</div>
                            </div>
                        </div>
                    }

                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default Product
