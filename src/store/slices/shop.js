import { createSlice } from "@reduxjs/toolkit";
import ProductsData from "../../assets/products.json";

const getLocalStorageItem = (key) => {
  const item = localStorage.getItem(key);

  try {
    return JSON.parse(item);
  } catch (error) {
    return item;
  }
};

const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getTotal = (list) => {
  const discountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  return list.reduce((acc, current) => {
    return (
      acc + discountedPrice(current.price, current.discount) * current.quantity
    );
  }, 0);
};

const initialState = {
  cart: getLocalStorageItem("cart") || [],
  products: ProductsData || [],
  totalAmount: getLocalStorageItem("totalAmount") || 0,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (product) => product.id === action.payload
      );

      if (item) {
        const inCart = state.cart.find((item) => item.id === action.payload);

        if (!inCart) {
          const cartItem = {
            ...item,
            quantity: 1,
          };

          state.cart.push(cartItem);
          state.totalAmount = getTotal(state.cart);

          setLocalStorageItem("totalAmount", state.totalAmount);
          setLocalStorageItem("cart", state.cart);
        }
      }
    },
    removeItemFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload
      );
      state.totalAmount = getTotal(state.cart);

      setLocalStorageItem("totalAmount", state.totalAmount);
      setLocalStorageItem("cart", state.cart);
    },
    updateQuantity: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1) {
        const updatedItem = {
          ...state.cart[itemIndex],
          quantity: action.payload.quantity,
        };

        state.cart[itemIndex] = updatedItem;
        state.totalAmount = getTotal(state.cart);

        setLocalStorageItem("totalAmount", state.totalAmount);
        setLocalStorageItem("cart", state.cart);
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalAmount = 0;
      setLocalStorageItem("totalAmount", state.totalAmount);
      setLocalStorageItem("cart", state.cart);
    },
  },
});

export const { addToCart, removeItemFromCart, updateQuantity, clearCart } =
  shopSlice.actions;
export default shopSlice.reducer;
