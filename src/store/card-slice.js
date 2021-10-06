import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initCardState = { items: [] };

const cardSlice = createSlice({
  name: "card",
  initialState: initCardState,
  reducers: {
    getAllOffer(state, action) {
      state.items = action.payload.items;
    },
  },
});

export const fetchCardData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        "http:///localhost:9010/api/react/products"
      );
      return response.data.cardItems;
    };

    await fetchData();

    const cardData = await fetchData();
    dispatch(
      cardActions.getAllOffer({
        items: cardData,
      })
    );
  };
};

export const cardActions = cardSlice.actions;
export default cardSlice;
