import './App.css';
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import {useState} from "react";
import {CartContextProvider} from "./store/CartContext";

function App() {
    const [cartIsVisible, setCartIsVisible] = useState(false)

    const showCartHandler = () => {
        setCartIsVisible(true)
    }

    const hideCartHandler = () => {
        setCartIsVisible(false)
    }
    return (
        <CartContextProvider>
            {cartIsVisible && <Cart onCartHide={hideCartHandler}/>}
            <Header onCartShow={showCartHandler}/>
            <main>
                <Meals/>
            </main>
        </CartContextProvider>
    );
}

export default App;
