import ReactDOM from 'react-dom';
import s from './Modal.module.css'
import React from "react";

const Backdrop = ({onCartHide}) => {
    return <div onClick={onCartHide} className={s.backdrop}></div>
}
const ModalWindow = (props) => {
    return <div className={s.modal}>
        <div className={s.content}>{props.children}</div>
    </div>
}
const portalElement = document.getElementById('overlays')
const Modal = ({onCartHide, ...props}) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onCartHide={onCartHide}/>, portalElement)}
            {ReactDOM.createPortal(<ModalWindow>{props.children}</ModalWindow>, portalElement)}
        </React.Fragment>
    );
};

export default Modal;