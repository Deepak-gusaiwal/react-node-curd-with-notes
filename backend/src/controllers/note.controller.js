import { Note } from "../models/note.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ErrorHandler from "../utils/error.js";
import { User } from "../models/user.model.js";

// createNote user controller
export const createNote = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  let checkUser = await User.findById(userId);
  if (!checkUser) {
    return next(new ErrorHandler("No User Found", 400));
  }
  try {
    const { title, description } = req.body;
    let note = new Note({ title, description, user: userId });
    await note.save();
    return ApiResponse.send(
      res,
      200,
      ApiResponse.success("Note Created Successfully", { note })
    );
  } catch (error) {
    return next(error);
  }
});

//get all notes
export const getAllNotes = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  let checkUser = await User.findById(userId);
  if (!checkUser) {
    return next(new ErrorHandler("No User Found", 400));
  }
  const notes = await Note.find({ user: userId });
  return ApiResponse.send(
    res,
    200,
    ApiResponse.success("Notes Retrieved Successfully", { notes })
  );
});

// Update Note controller
export const updateNote = asyncHandler(async (req, res, next) => {
  const { id } = req.params; // Note ID from URL parameter
  const { userId } = req;

  try {
    // Find the note by ID
    let note = await Note.findById(id);

    // Check if the note exists
    if (!note) {
      return next(new ErrorHandler("Note not found", 404));
    }

    // Check if the note belongs to the user
    if (note.user.toString() !== userId) {
      return next(new ErrorHandler("Not authorized to update this note", 401));
    }

    // Update the note
    note = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return ApiResponse.send(
      res,
      200,
      ApiResponse.success("Note Updated Successfully", { note })
    );
  } catch (error) {
    return next(error);
  }
});

// Delete Note controller
export const deleteNote = asyncHandler(async (req, res, next) => {
  const { id } = req.params; // Note ID from URL parameter
  const { userId } = req;

  try {
    // Find the note by ID
    const note = await Note.findById(id);

    // Check if the note exists
    if (!note) {
      return next(new ErrorHandler("Note not found", 404));
    }

    // Check if the note belongs to the user
    if (note.user.toString() !== userId) {
      return next(new ErrorHandler("Not authorized to delete this note", 401));
    }

    // Delete the note
    await Note.deleteOne({ _id: id });

    return ApiResponse.send(
      res,
      200,
      ApiResponse.success("Note Deleted Successfully")
    );
  } catch (error) {
    return next(error);
  }
});
