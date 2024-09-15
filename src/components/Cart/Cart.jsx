import React, {useContext, useState} from 'react';
import s from './Cart.module.css'
import Modal from "../UI/Modal";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";
import CartOrder from "./CartOrder";

const Cart = ({onCartHide}) => {
    const ctx = useContext(CartContext)
    const [isFormAvailable, setFormAvailable] = useState(false)
    const [isOrderSubmitting, setOrderIsSubmitting] = useState(false)
    const [isOrderSubmited, setIsOrderSubmited] = useState(false)
    const [isOrderSubmitError, setOrderSubmitError] = useState(false)

    const cartItems = ctx.items.map((item) => <CartItem key={item.id}
                                                        id={item.id}
                                                        name={item.name}
                                                        price={item.price}
                                                        amount={item.amount}
                                                        className={s['cart-item']}></CartItem>)

    const cartHaveItems = ctx.items.length > 0;

    const totalPrice = ctx.totalAmount.toFixed(2)


    const showFormHandler = () => {
        setFormAvailable(true)
    }
    const submitOrderHandler = async (userData) => {
        setOrderIsSubmitting(true)
        try {
            const response = await fetch('https://udemy-react-f6ba3-default-rtdb.europe-west1.firebasedatabase.app/order.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({Meals: ctx.items, user: userData})
            })

            if (response.ok) {
                setIsOrderSubmited(true)
                setOrderIsSubmitting(false)
                ctx.clearCart()
            } else {
                console.log('hello')
                setIsOrderSubmited(false)
                setOrderIsSubmitting(false)
                setOrderSubmitError(true)
            }
        } catch (e) {
            console.log(e)
            setIsOrderSubmited(false)
            setOrderIsSubmitting(false)
            setOrderSubmitError(true)
        }
    }

    const orderButtons = <div className={s.actions}>
        <button onClick={onCartHide} className={s['button-alt']}>Закрыть</button>
        {cartHaveItems && <button onClick={showFormHandler} className={s.button}>Заказать</button>}
    </div>

    let content;

    if (isOrderSubmitting) {
        content = <p>Ваш заказ отправляется</p>
    }
    if (!isOrderSubmitting && !isOrderSubmitError) {
        content = <>
            <ul className={s['cart-items']}>{cartItems} </ul>
            <div className={s['total-container']}>
                <div className={s.total}>
                    <span>Итого</span>
                    <span>{totalPrice}</span>
                </div>
                {isFormAvailable && <CartOrder onSubmit={submitOrderHandler} onCartHide={onCartHide}/>}
                {!isFormAvailable && orderButtons}
            </div>

        </>
    }
    if (isOrderSubmited) {
        content = <><p>Спасибо за заказ</p>
            <div className={s.actions}>
                <button onClick={onCartHide} className={s['button-alt']}>Закрыть</button>
            </div>
        </>

    }
    if (isOrderSubmitError) {
        content = <p>Что-то пошло не так</p>
    }
    return (
        <Modal onCartHide={onCartHide}>
            {content}
        </Modal>);
};

export default Cart;