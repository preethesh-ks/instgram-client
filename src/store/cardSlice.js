import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    selectedCardIndex: null,
    commentBoxVisible: {}, // Object to track comment box visibility by card index
  },
  reducers: {
    setSelectedCardIndex: (state, action) => {
      state.selectedCardIndex = action.payload;
    },
    setCommentBoxVisibility: (state, action) => {
      const { cardIndex, isVisible } = action.payload;
      state.commentBoxVisible[cardIndex] = isVisible;
    },
  },
});
export const toggleCommentBox = (cardIndex) => async (dispatch) => {
  // Perform asynchronous tasks here if needed
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async action

  dispatch(setCommentBoxVisibility({ cardIndex, isVisible: true }));
};
export const { setSelectedCardIndex, setCommentBoxVisibility } =
  cardSlice.actions;

export default cardSlice.reducer;