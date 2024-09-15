import React, { useRef, useState} from 'react';
import s from './MealItemForm.module.css'
import Input from "../../UI/Input";



const MealItemForm = ({id, onAddToCart}) => {
    const [isAmountValid, setAmountValid] = useState(true)

    const amountInputRef = useRef()
    const submitHandler = () => {
        const inputAmount = amountInputRef.current.value;
        if (inputAmount.trim().length === 0 || +inputAmount <= 0 || inputAmount > 10) {
            setAmountValid(false)
            return
        }  onAddToCart(+inputAmount)

    }

    return (<form className={s.form} onSubmit={submitHandler}>
        <Input ref={amountInputRef} label='Количество'
               input={{
                   id: id,
                   type: 'number',
                   min: 1,
                   step: 1,
                   defaultValue: 1


               }}/>
        <button type={"button"} onClick={submitHandler}>Добавить</button>
        {!isAmountValid && <p>введите пожалуйста количество от 1 до 10</p>}
    </form>);
};

export default MealItemForm;