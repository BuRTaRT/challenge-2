import React from 'react';
import s from './Input.module.css'

const Input = React.forwardRef((props,ref) => {
    return (
        <div className={s.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} value={props.value} onChange={props.onChange} {...props.input} />
        </div>
    );
}
)

export default Input;