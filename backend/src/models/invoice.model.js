import { Schema, model } from "mongoose";

const InvoiceItemSchema = new Schema({
  item: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hsaSac: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  sgst: {
    type: Number,
    required: true,
  },
  cgst: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const InvoiceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    item: InvoiceItemSchema,
  },
  { timestamps: true }
);
export const Invoice = model("Invoice", InvoiceSchema);
