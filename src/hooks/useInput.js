import {useState} from 'react';
import s from '../components/Cart/CartOrder.module.css'

const UseInput = (validateValueFunc) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [wasInputTouched, setWasInputTouched] = useState(false);

    const isEnteredValueValid = validateValueFunc(enteredValue);
    const isInputInvalid = !isEnteredValueValid && wasInputTouched;

    const inputChangeHandler = (e) => {
        setEnteredValue(e.target.value)
    }
    const inputBlurHandler = (e) => {
        setWasInputTouched(true)
    }
    const resetInputValues = () => {
        setEnteredValue('')
        setWasInputTouched(false)
    }
    const inputClasses = isInputInvalid ? `${s['form-control']} ${s.invalid}` : s['form-control'];

    return (
        {
            value: enteredValue,
            hasError: isInputInvalid,
            isInputValid: isEnteredValueValid,
            inputBlurHandler,
            inputChangeHandler,
            resetInputValues,
            inputClasses
        }
    );
};

export default UseInput;