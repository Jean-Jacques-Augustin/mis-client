import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CartItem {
    id: string;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingIndex = state.items.findIndex(
                item => item.id === action.payload.id,
            );

            if (existingIndex >= 0) {
                // If the item exists, update the quantity
                state.items[existingIndex].quantity += action.payload.quantity;
            } else {
                // If the item is new, add it to the cart
                state.items.push(action.payload);
            }
        },

        updateQuantity: (
            state,
            action: PayloadAction<{id: string; quantity: number}>,
        ) => {
            const item = state.items.find(
                item => item.id === action.payload.id,
            );
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                item => item.id !== action.payload,
            );
        },
        removeAllFromCart: state => {
            state.items = [];
        },
    },
});

export const {addToCart, updateQuantity, removeFromCart, removeAllFromCart} =
    cartSlice.actions;

export default cartSlice.reducer;
