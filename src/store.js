import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeName(state) {
      state.name = "park";
    },
    changeAge(state) {
      state.age += 1;
    },
  },
});
export let { changeName, changeAge } = user.actions;

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "white and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    changeCnt(state, action) {
      let num = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[num].count++;
    },
    addItem(state, action) {
      let num = state.findIndex((a) => {
        return a.id === action.payload.id;
      });
      if (num === -1) {
        state.push(action.payload);
      } else {
        state[num].count++;
      }
    },
    deleteProduct(state, action) {
      let num = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state.splice(num, 1);
    },
  },
});
export let { changeCnt, addItem, deleteProduct } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
