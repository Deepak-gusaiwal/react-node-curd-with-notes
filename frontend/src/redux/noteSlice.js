import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../utils/Axios";
import { toast } from "react-toastify";
import { toggleNoteModal } from "./baseSlice";

// add note
export const addNote = createAsyncThunk(
  "notes/addNote",
  async (noteData, thunkAPI) => {
    try {
      const { data } = await Axios.post("/note/create", noteData);
      data.success && toast.success(data.message);
      //   console.log('respose ',data)
      return data.result.note; // Assuming the response contains the created note
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// gat all note
export const getNotes = createAsyncThunk(
  "notes/getNotes",
  async (_, thunkAPI) => {
    try {
      const { data } = await Axios.get("/note/read-all");
      data.success && toast.success(data.message);
      //   console.log('respose ',data)
      return data.result.notes; // Assuming the response contains the created note
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// delete note
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id, thunkAPI) => {
    try {
      const { data } = await Axios.delete(`/note/delete/${id}`);
      data.success && toast.success(data.message);
      //   console.log('respose ',data)
      if (data.success) {
        return id; // Assuming the response contains the created note
      } else {
        toast.error("Failed to delte note");
        throw new Error("Failed to delete note");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// update note
export const editNote = createAsyncThunk(
  "notes/editNote",
  async ({ id, formInputs }, thunkAPI) => {
    try {
      const { data } = await Axios.put(`/note/update/${id}`, formInputs);
      console.log("respose ", data);
      if (data.success) {
        toast.success(data.message);
        thunkAPI.dispatch(toggleNoteModal({ view: false, id: null }));
      }
      return data.result.note;
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
  notes: [],
  fetchedStatus: statusVal.idle,
  createStatus: statusVal.idle,
  updateStatus: statusVal.idle,
  deleteStatus: statusVal.idle,
  statusVal,
  error: null,
};
const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNote.pending, (state) => {
        state.createStatus = state.statusVal.loading;
        state.error = null;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.createStatus = state.statusVal.success;
        state.notes.push(action.payload); // Adjust based on your response structure
      })
      .addCase(addNote.rejected, (state, action) => {
        state.createStatus = state.statusVal.failed;
        state.error = action.payload.message; // Adjust based on your response structure
      })
      .addCase(getNotes.pending, (state) => {
        state.fetchedStatus = state.statusVal.loading;
        state.error = null;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.fetchedStatus = state.statusVal.success;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.fetchedStatus = state.statusVal.failed;
        state.error = action.payload.message; // Adjust based on your response structure
      })
      .addCase(deleteNote.pending, (state) => {
        state.deleteStatus = state.statusVal.loading;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.deleteStatus = state.statusVal.success;
        state.notes = state.notes.filter((note) => note._id !== action.payload); // Remove the deleted note
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.deleteStatus = state.statusVal.failed;
        state.error = action.payload.message; // Adjust based on your response structure
      })
      .addCase(editNote.pending, (state) => {
        state.updateStatus = statusVal.loading;
        state.error = null;
      })
      .addCase(editNote.fulfilled, (state, action) => {
        state.updateStatus = statusVal.success;
        const index = state.notes.findIndex(
          (note) => note._id === action.payload._id
        );
        if (index !== -1) {
          state.notes[index] = action.payload; // Update the note
        }
      })
      .addCase(editNote.rejected, (state, action) => {
        state.updateStatus = statusVal.failed;
        state.error = action.payload.message; // Adjust based on your response structure
      });
  },
});
export default noteSlice.reducer;
