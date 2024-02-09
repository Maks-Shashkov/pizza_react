import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, action) {
            const findItem = state.items.find((obj => obj.id === action.payload.id))
            if (findItem) {
                findItem.count++
            } else  {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = state.items.reduce((sum, odj) => {
                return (odj.price * odj.count) + sum
            }, 0)
        },
        minusProduct(state, action) {
            const findItem = state.items.find((obj => obj.id === action.payload.id));
            
            if(findItem) {
                findItem.count--
            }
            
            state.totalPrice = state.items.reduce((sum, odj) => {
                return (odj.price * odj.count) - sum
            }, 0)
            
        },
        removeProduct(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload.id);
        },
        clearProduct(state) {
            state.items = [];
            state.totalPrice = 0
        },
        
        
    }
});

export const {addProduct,removeProduct,clearProduct,minusProduct} = cartSlice.actions;

export default cartSlice.reducer