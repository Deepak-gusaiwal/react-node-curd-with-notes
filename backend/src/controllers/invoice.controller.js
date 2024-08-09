import { Invoice } from "../models/invoice.model.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ErrorHandler from "../utils/error.js";

// createInvoice user controller
export const addInvoice = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const { items } = req.body;
  let checkUser = await User.findById(userId);
  if (!checkUser) {
    return next(new ErrorHandler("No User Found", 400));
  }
  try {
    // Ensure items is an array
    if (!items || !Array.isArray(items)) {
      return next(
        new ErrorHandler(
          !items
            ? "invoice data are not proviced"
            : "invoice data must be an array",
          400
        )
      );
    }
    // Save invoices and wait for all to complete
    const savedInvoices = await Promise.all(
      items.map(async (item) => {
        const invoice = new Invoice({ user: userId, item });
        return invoice.save();
      })
    );

    return ApiResponse.send(
      res,
      200,
      ApiResponse.success("Invoice Added Successfully", {
        invoices: savedInvoices,
      })
    );
  } catch (error) {
    return next(error);
  }
});
// fetch invoices user controller
export const getInvoices = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  let checkUser = await User.findById(userId);
  if (!checkUser) {
    return next(new ErrorHandler("No User Found", 400));
  }
  try {
    const invoices = await Invoice.find({ user: userId });
    return ApiResponse.send(
      res,
      200,
      ApiResponse.success("Invoice Fetched Successfully", {
        invoices,
      })
    );
  } catch (error) {
    return next(error);
  }
});
// Delete Invoice controller
export const deleteInvoice = asyncHandler(async (req, res, next) => {
  const { id } = req.params; // Note ID from URL parameter
  const { userId } = req;

  try {
    const invoice = await Invoice.findById(id);
    // Check if the invoice exists
    if (!invoice) {
      return next(new ErrorHandler("Invoice not found", 404));
    }
    // Check if the invoice belongs to the user
    if (invoice.user.toString() !== userId) {
      return next(
        new ErrorHandler("Not authorized to delete this invoice", 401)
      );
    }
    // Delete the note
    await Invoice.deleteOne({ _id: id });

    return ApiResponse.send(
      res,
      200,
      ApiResponse.success("Invoice Deleted Successfully")
    );
  } catch (error) {
    return next(error);
  }
});
// Edit Invoice controller
export const editInvoice = asyncHandler(async (req, res, next) => {
  const { id } = req.params; // Note ID from URL parameter
  const { userId } = req;

  try {
    let invoice = await Invoice.findById(id);
    // Check if the invoice exists
    if (!invoice) {
      return next(new ErrorHandler("Invoice not found", 404));
    }
    // Check if the invoice belongs to the user
    if (invoice.user.toString() !== userId) {
      return next(
        new ErrorHandler("Not authorized to delete this invoice", 401)
      );
    }
    // Delete the note
    invoice = await Invoice.findByIdAndUpdate(
      id,
      { item: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    return ApiResponse.send(
      res,
      200,
      ApiResponse.success("Invoice Updated Successfully", { invoice })
    );
  } catch (error) {
    return next(error);
  }
});
