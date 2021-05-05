import shelfStyles from '../stylesheets/shelf.module.css'

const ItemPreview = (props) => {
    return (
        <div>
            <div className={shelfStyles.productImageContainer}>
                <div className={shelfStyles.productImageBg}><div></div><div className={shelfStyles.productImageBgSupport} style={{backgroundColor: props.data.color}}></div></div>
                <div className={shelfStyles.productImageDiv}><img src={props.data.imgs[0]} className={shelfStyles.productImage} alt="product preview"/></div>
            </div>
            <div className={shelfStyles.productInfo} style={{backgroundColor: props.data.color}}>
                <p className={shelfStyles.productCompany}> {props.data.company} </p>
                <p className={shelfStyles.productName}> {props.data.name} </p>
                <div className={shelfStyles.productWeightPricing}>
                    <div className={shelfStyles.productWeight}><p>&#x20B9;{props.data.unit_price}/-</p></div>
                    <div></div>
                    <div className={shelfStyles.productWeight}><p>{props.data.unit_weight}g</p></div>
                </div>
            </div>
        </div>
    )
}

export default ItemPreview
