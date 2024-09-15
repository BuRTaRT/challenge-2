import classes from "./CartItem.module.css";
import {useContext} from "react";
import CartContext from "../../store/CartContext";

const CartItem = (props) => {
    const price = `$${props.price.toFixed(2)}`;
    const ctx = useContext(CartContext)
    const addItemHandler = () => {
        ctx.addItem({...props, amount: 1})
    }
    const removeItemHandler = () => {
        ctx.removeItem(props)
    }


    return (
        <li className={classes["cart-item"]}>
            <div>
                <h2>{props.name}</h2>
                <div className={classes.summary}>
                    <span className={classes.price}>{price}</span>
                    <span className={classes.amount}>x {props.amount}</span>
                </div>
            </div>
            <div className={classes.actions}>
                <button onClick={removeItemHandler}>−</button>
                <button onClick={addItemHandler}>+</button>
            </div>
        </li>
    );
};

export default CartItem;
