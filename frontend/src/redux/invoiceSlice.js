import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../utils/Axios";
import { toast } from "react-toastify";

// add invoice
export const addInvoice = createAsyncThunk(
  "invoice/add",
  async (invoiceData, thunkAPI) => {
    // console.log('invoiceData',invoiceData)
    try {
      const { data } = await Axios.post("/invoice/add", invoiceData);
      data.success && toast.success(data.message);
      return data.result.invoices; // Assuming the response contains the created note
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//get invoice
export const fetchInvoices = createAsyncThunk(
  "invoice/get",
  async (_, thunkAPI) => {
    try {
      const { data } = await Axios.get("/invoice/get");
      return data.result.invoices;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//delete invoice
export const deleteInvoice = createAsyncThunk(
  "invoice/delete",
  async (id, thunkAPI) => {
    try {
      const { data } = await Axios.delete(`/invoice/delete/${id}`);
      console.log("response", data);
      if (data.success) {
        toast.success(data.message);
        return id;
      } else {
        toast.error("Failed to delete Invoice");
        throw new Error("Failed to delete Invoice");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// update invoie
export const editInvoice = createAsyncThunk(
  "notes/editInvoice",
  async ({ id, formInputs }, thunkAPI) => {
    try {
      const { data } = await Axios.put(`/invoice/update/${id}`, formInputs);
      console.log("respose ", data);
      if (data.success) {
        toast.success(data.message);
        thunkAPI.dispatch(toggleInvoiceModal({ view: false, id: null }));
        return data?.result?.invoice;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const statusVal = {
  idle: "idle",
  loading: "loading",
  success: "success",
  failed: "failed",
};

const initialState = {
  invoices: [],
  fetchedStatus: statusVal.idle,
  createStatus: statusVal.idle,
  updateStatus: statusVal.idle,
  deleteStatus: statusVal.idle,
  statusVal,
  error: null,
  editInvoiceModal: { view: false, id: null },
};
const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    toggleInvoiceModal: (state, action) => {
      state.editInvoiceModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.fetchedStatus = state.statusVal.loading;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.fetchedStatus = state.statusVal.success;
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.fetchedStatus = state.statusVal.failed;
        state.error = action.payload.message;
      })
      .addCase(addInvoice.pending, (state) => {
        state.createStatus = state.statusVal.loading;
        state.error = null;
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        state.createStatus = state.statusVal.success;
        state.invoices = [...state.invoices, ...action.payload];
      })
      .addCase(addInvoice.rejected, (state, action) => {
        state.createStatus = state.statusVal.failed;
        state.error = action.payload.message;
      })
      .addCase(deleteInvoice.pending, (state) => {
        state.deleteStatus = state.statusVal.loading;
        state.error = null;
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.deleteStatus = state.statusVal.success;
        state.invoices = state.invoices.filter(
          (invoice) => invoice._id !== action.payload
        );
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.deleteStatus = state.statusVal.failed;
        state.error = action.payload.message;
      })
      .addCase(editInvoice.pending, (state) => {
        state.updateStatus = state.statusVal.loading;
        state.error = null;
      })
      .addCase(editInvoice.fulfilled, (state, action) => {
        state.updateStatus = state.statusVal.success;
        state.invoices = state.invoices.map((invoice) =>
          invoice._id == action.payload._id ? action.payload : invoice
        );
      })
      .addCase(editInvoice.rejected, (state, action) => {
        state.updateStatus = state.statusVal.failed;
        state.error = action.payload.message;
      });
  },
});
export const { toggleInvoiceModal } = invoiceSlice.actions;
export default invoiceSlice.reducer;
