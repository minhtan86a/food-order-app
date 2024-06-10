import { createContext, useReducer } from "react";

//create a shape of CartContext
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
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
  }

  return state;
}

export function CartContextProvider({ children }) {
  //logic handle cart here
  useReducer(cartReducer, { items: [] });

  return <CartContext.Provider>{children}</CartContext.Provider>;
}

export default CartContext;
