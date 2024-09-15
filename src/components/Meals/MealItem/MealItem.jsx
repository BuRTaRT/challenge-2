import React, {useContext} from 'react';
import s from './MealItem.module.css'
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/CartContext";

const MealItem = ({price, description, name, id}) => {
    const itemPrice = `$${price.toFixed(2)}`;
    const cartContext = useContext(CartContext)
    const addToCartHandler = (amount) => {
        cartContext.addItem({
            id,
            name,
            amount,
            price
        })
    }
    return (
        <li className={s.meal}>
            <div>
                <h3>{name}</h3>
                <div className={s.description}>{description}</div>
                <div className={s.price}>{itemPrice}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler}/>
            </div>
        </li>
    );
};

export default MealItem;