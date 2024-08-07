import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showNoteModal:{view:false,id:null}
};

const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    toggleNoteModal: (state, action) => {
      state.showNoteModal = action.payload;
    },
  },
});
export const { toggleNoteModal } = baseSlice.actions;
export default baseSlice.reducer;
