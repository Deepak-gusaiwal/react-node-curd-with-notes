import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import baseSlice from "./baseSlice";
import noteSlice from "./noteSlice";
import invoiceSlice from "./invoiceSlice";

export const store = configureStore({
  reducer: {
    base: baseSlice,
    auth: authSlice,
    note: noteSlice,
    invoice: invoiceSlice,
  },
});
