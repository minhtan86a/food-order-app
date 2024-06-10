import { createContext, useReducer } from "react";

//create a shape of CartContext
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

//return an updated state
//action will tell how to update this state
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // Update the state to add a meal item
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    //check item exist
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];

      //have item in cart
      const updatedItem = {
        ...existingItem, //clone all items in cart
        quantity: existingItem.quantity + 1, //then +1
      };

      //update item at the index
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      //don't have the item in cart (array)
      //add item into cart and set quantity = 1
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    //update items for state.
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    //Remove an item from the state

    //Get index of item
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1); //remove item
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    //update items for state.
    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  //logic handle cart here
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({
      type: "ADD_ITEM",
      item,
    });
  }

  function removeItem(id) {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id,
    });
  }

  function clearCart() {
    dispatchCartAction({
      type: "CLEAR_CART",
    });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  //console.log(cartContext);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
