const ItemPreview = (props) => {
    return (
        <div>
            <p> {props.data.company} </p>
            <p> {props.data.name} </p>
            <p> {props.data.unit_weight} </p>
            <p> {props.data.unit_price} </p>
        </div>
    )
}

export default ItemPreview
