import React, {useReducer} from 'react';

const CartContext = React.createContext({
    items: [],
    totalAmount: 0
});

const cartDefaultState = {
    items: [],
    totalAmount: 0
}

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = "REMOVE_ITEM"
const CLEAR_CART = "CLEAR_CART"
const cartReducer = (state, action) => {
    switch (action.type) {
        case ADD_ITEM: {
            const updatedAmount = state.totalAmount + action.item.price * action.item.amount;
            let updatedItems = state.items.map(item =>
                item.id === action.item.id
                    ? {...item, amount: item.amount + action.item.amount}
                    : item
            );

            // If the item does not exist, add it
            if (!state.items.some(item => item.id === action.item.id)) {
                updatedItems = [...updatedItems, action.item];
            }

            return {
                items: updatedItems,
                totalAmount: updatedAmount
            };

        }
        case REMOVE_ITEM: {
            let updatedItem;
            let updatedItems = [...state.items];
            let updatedAmount = state.totalAmount
            for (let [index, item] of updatedItems.entries()) {
                updatedItem = {...item}
                if (updatedItem.id === action.item.id && updatedItem.amount >= 1) {
                    updatedItem.amount -= 1
                    updatedItems[index] = updatedItem;
                    updatedAmount -= item.price
                }
                if (updatedItem.id === action.item.id && updatedItem.amount === 0) {
                    updatedItems.splice(index, 1)

                }
            }
            return {
                items: updatedItems,
                totalAmount: updatedAmount


            }
        }
        case CLEAR_CART: {
            return cartDefaultState
        }

        default:
            return {}
    }

}

export const CartContextProvider = (props) => {
    const [cartState, dispatchCartState] = useReducer(cartReducer, cartDefaultState)

    const addItemHandler = (item) => {
        dispatchCartState({type: ADD_ITEM, item})
    }
    const removeItemHandler = (item) => {
        dispatchCartState({type: REMOVE_ITEM, item})
    }
    const clearCartHandler = () => {
        dispatchCartState({type: CLEAR_CART})
    }
    return (
        <CartContext.Provider value={{
            addItem: addItemHandler,
            items: cartState.items,
            totalAmount: cartState.totalAmount,
            removeItem: removeItemHandler,
            clearCart: clearCartHandler
        }}>
            {props.children}
        </CartContext.Provider>);
};

export default CartContext;