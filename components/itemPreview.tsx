// NEXT
import Link from 'next/link'
// CSS
import shelfStyles from '../stylesheets/shelf.module.css'
// ANTD
import { Button } from 'antd'

const ItemPreview = (props: any) => {
    return (
        <div>
            <div className={shelfStyles.productImageContainer}>
                <div className={shelfStyles.productImageBg}><div></div><div className={shelfStyles.productImageBgSupport} style={{backgroundColor: props.data.color}}></div></div>
                <div className={shelfStyles.productImageDiv}><img src={props.data.imgs[0]} className={shelfStyles.productImage} alt="product preview" loading="lazy"/></div>
            </div>
            <div className={shelfStyles.productInfo} style={{backgroundColor: props.data.color}}>
                <Link href={`/product/${props.data.company} ${props.data.name}`}><div>
                <p className={shelfStyles.productCompany}> {props.data.company} </p>
                <p className={shelfStyles.productName}> {props.data.name} </p>
                <div className={shelfStyles.productWeightPricing}>
                    <div className={shelfStyles.productWeight}><p>&#x20B9;{props.data.unit_price}/-</p></div>
                    <div></div>
                    <div className={shelfStyles.productWeight}><p>{props.data.unit_weight}g</p></div>
                </div>
                </div></Link>
                <div className={shelfStyles.btnWrapper}>
                    <Button className={shelfStyles.btnAddToCart}>Add To Cart</Button>
                </div>
            </div>
        </div>
    )
}

export default ItemPreview
