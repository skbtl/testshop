import { createContext, useReducer } from "react";
import { useContext } from "react";
import { cartReducer } from "../reducer/cartReducer";

const initialState = {
  cartList: [],
  total: 0,
};

const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    const updatedCartList = state.cartList.concat(product);
    const total = state.total + product.price;
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        products: updatedCartList,
        total: total,
      },
    });
  };

  const removeFromCart = (product) => {
    const updatedCartList = state.cartList.filter(
      (item) => item.id !== product.id
    );
    const total = state.total - product.price;
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        products: updatedCartList,
        total: total,
      },
    });
  };

  const value = {
    total: state.total,
    cartList: state.cartList,
    addToCart,
    removeFromCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};
