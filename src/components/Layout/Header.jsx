import s from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";

const Header = ({onCartShow}) => {
    return (
        <>
            <header className={s.header}>
                <h1>Япона Суши</h1>
                <HeaderCartButton onCartShow={onCartShow}/>
            </header>
            <div className={s['main-image']}><img src="/sushi.jpg" alt="суши"/></div>
        </>);
};

export default Header;