 import s from './CartOrder.module.css'
import useInput from "../../hooks/useInput";


const CartOrder = ({onCartHide, onSubmit}) => {

    const {
        value: nameInput,
        hasError: nameHasError,
        isInputValid: nameInputIsValid,
        inputBlurHandler: nameInputBlur,
        inputChangeHandler: nameInputChange,
        resetInputValues: resetNameInputValues,
        inputClasses: nameInputClasses
    } = useInput((val) => val.length > 3)
    const {
        value: cityInput,
        hasError: cityHasError,
        isInputValid: cityInputIsValid,
        inputBlurHandler: cityInputBlur,
        inputChangeHandler: cityInputChange,
        resetInputValues: resetCityInputValues,
        inputClasses: cityInputClasses
    } = useInput((val) => val.length > 3)
    const {
        value: streetInput,
        hasError: streetHasError,
        isInputValid: streetInputIsValid,
        inputBlurHandler: streetInputBlur,
        inputChangeHandler: streetInputChange,
        resetInputValues: resetStreetInputValues,
        inputClasses: streetInputClasses
    } = useInput((val) => val.length > 3)

    let isFormValid = false;
    if (nameInputIsValid && cityInputIsValid && streetInputIsValid) {
        isFormValid = true
    }

    const confirmOrderSubmit = async (e) => {
        e.preventDefault();
        onSubmit({
            name: nameInput,
            street: streetInput,
            city: cityInput
        })
        resetNameInputValues()
        resetStreetInputValues()
        resetCityInputValues()
    }

    return (
        <form className={s.form} onSubmit={confirmOrderSubmit}>
            <div className={nameInputClasses}>
                <label htmlFor="name">name</label>
                <input value={nameInput} onBlur={nameInputBlur} onChange={nameInputChange} id='name' type="text"/>
                {nameHasError && <p className={s['error-text']}>Введите корректное имя</p>}
            </div>
            <div className={cityInputClasses}>
                <label htmlFor="city">city</label>
                <input value={cityInput} onChange={cityInputChange} onBlur={cityInputBlur} id='city' type="text"/>
                {cityHasError && <p className={s['error-text']}>Введите корректный город</p>}
            </div>
            <div className={streetInputClasses}>
                <label htmlFor="street">street</label>
                <input value={streetInput} onChange={streetInputChange} onBlur={streetInputBlur} id='street'
                       type="text"/>
                {streetHasError && <p className={s['error-text']}>Введите корректную улицу</p>}
            </div>
            <div className={s.actions}>
                <button disabled={!isFormValid} className={s.submit} type='submit'>подтвердить заказ</button>
                <button onClick={onCartHide} type='button'>отменить</button>
            </div>
        </form>
    );
};

export default CartOrder;