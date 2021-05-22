// NEXT
import Link from 'next/link'
// REACT
import { useCartContext } from '../context/cart'
import { useState, useEffect } from 'react'
// CSS
import shelfStyles from '../stylesheets/shelf.module.css'
// ANTD
import { Button } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

const ItemPreview = (props: any) => {
    const [prodCount, setProdCount] = useState(0)
    const { cart }: any = useCartContext()
    const { addToCart }: any = useCartContext()
    const { removeFromCart }: any = useCartContext()
    const addProd = () => addToCart(props.data._id, props.data.name, props.data.company, props.data.imgs[0], props.data.unit_price)
    const removeProd = () => removeFromCart(props.data._id)

    useEffect(() => {
        let temp_count = 0
        for (var prod in cart){
            if (props.data._id === cart[prod].id){
                temp_count = cart[prod].qty
            }
        }
        setProdCount(temp_count)
    }, [cart] );

    return (
        <div>
            <div className={shelfStyles.productImageContainer}>
                <div className={shelfStyles.productImageBg}><div></div><div className={shelfStyles.productImageBgSupport} style={{backgroundColor: props.data.color}}></div></div>
                <div className={shelfStyles.productImageDiv}><Link href={`/product/${props.data.company} ${props.data.name}`}><img src={props.data.imgs[0]} className={shelfStyles.productImage} alt="product preview" loading="lazy"/></Link></div>
            </div>
            <div className={shelfStyles.productInfo} style={{backgroundColor: props.data.color}}>
                <Link href={`/product/${props.data.company} ${props.data.name}`}>
                <div className="pointer">
                <p className={shelfStyles.productCompany}> {props.data.company} </p>
                <p className={shelfStyles.productName}> {props.data.name} </p>
                <div className={shelfStyles.productWeightPricing}>
                    <div className={shelfStyles.productWeight}><p>&#x20B9;{props.data.unit_price}/-</p></div>
                    <div></div>
                    {
                        props.data.is_liquid ?
                        <div className={shelfStyles.productWeight}><p>{props.data.unit_capacity>999 ? props.data.unit_capacity/1000 : props.data.unit_capacity}{props.data.unit_capacity>999 ? "L" : "ml"}</p></div>
                        :
                        <div className={shelfStyles.productWeight}><p>{props.data.unit_weight>999 ? props.data.unit_weight/1000 : props.data.unit_weight}{props.data.unit_weight>999 ? "Kg" : "g"}</p></div>
                    }
                </div>
                </div>
                </Link>
                <div className={shelfStyles.btnWrapper}>
                    <div>{prodCount ? <Button shape="circle" size="small" icon={<MinusOutlined/>} className={shelfStyles.btnMinus} type="primary" danger onClick={removeProd}/> : null}</div>
                    <div>{prodCount ? <p>{prodCount}</p> : <Button className={shelfStyles.btnAddToCart} onClick={addProd}>Add to Cart</Button>}</div>
                    <div>{prodCount ? <Button shape="circle" size="small" icon={<PlusOutlined/>} className={shelfStyles.btnPlus} type="primary" onClick={addProd}/> : null}</div>
                </div>
            </div>
        </div>
    )
}

export default ItemPreview
