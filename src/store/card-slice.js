import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";

const initCardState = { items: [] };
const host = process.env.REACT_APP_API_ENDPOINT;

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
      const response = await axios.get(`${host}/api/react/products`);
      return response.data.cardItems;
    };

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
