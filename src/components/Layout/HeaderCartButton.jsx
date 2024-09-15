import React, {useContext, useEffect, useState} from 'react';
import CartIcon from "../Cart/CartIcon";
import s from './HeaderCartButton.module.css'
import cartContext from "../../store/CartContext";

const HeaderCartButton = ({onCartShow}) => {
    const ctx = useContext(cartContext)
    const [isButtonAnimated, setButtonAnimated] = useState(false)
    let amount = 0;

    for (let item of ctx.items) {
        (amount += +item.amount).toFixed(2);
    }
    const buttonClasses = `${s.button} ${isButtonAnimated && s.bump}`
    useEffect(() => {
        if (ctx.items.length === 0) {
            return
        }
        setButtonAnimated(true);
        let timer = setTimeout(() => {
            setButtonAnimated(false)
        }, 300)
        return () => {
            clearTimeout(timer)
        }
    }, [ctx.items])
    return (
        <button onClick={onCartShow} className={buttonClasses}>
            <span className={s.icon}>
                <CartIcon/>
            </span>
            <span>Корзина</span>
            <span className={s.badge}>{amount}</span>
        </button>
    );
};

export default HeaderCartButton;