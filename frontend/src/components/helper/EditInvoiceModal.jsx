import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "./Input";
import Button from "./Button";
import Select from "./Select";
import { useForm } from "react-hook-form";
import { editInvoice, toggleInvoiceModal } from "../../redux/invoiceSlice";

const EditInvoiceModal = () => {
  const { invoices, editInvoiceModal } = useSelector((state) => state.invoice);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  useEffect(() => {
    const invoice = invoices.filter(
      (invoice) => invoice._id == editInvoiceModal.id
    );
    setSelectedInvoice(invoice[0]);
  }, [editInvoiceModal.id]);

  return (
    <div className="fixed top-0 left-0 z-[99] w-full h-full p-2 bg-zinc-800 bg-opacity-85 flex items-center">
      {selectedInvoice?.item && (
        <EditInvoiceForm id={selectedInvoice._id} data={selectedInvoice.item} />
      )}
    </div>
  );
};

const EditInvoiceForm = ({ data, id }) => {
  const dispatch = useDispatch();
  // Set up react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    dispatch(toggleInvoiceModal({ view: false, id: null }));
  };

  useEffect(() => {
    setValue("item", data.item);
    setValue("description", data.description);
    setValue("hsaSac", data.hsaSac);
    setValue("qty", data.qty);
    setValue("unitPrice", data.unitPrice);
    setValue("sgst", data.sgst);
    setValue("cgst", data.cgst);
    setValue("total", data.total);
  }, [data]);

  // Common function to calculate the total
  const calculateTotal = (qty = 1, unitPrice = 0, sgst = 0, cgst = 0) => {
    const quantity = parseFloat(qty);
    const price = parseFloat(unitPrice);
    const sgstValue = parseFloat(sgst);
    const cgstValue = parseFloat(cgst);
    return (
      quantity * price +
      (quantity * price * (sgstValue + cgstValue)) / 100
    ).toFixed(2);
  };

  // Watch specific fields
  const qty = watch("qty");
  const unitPrice = watch("unitPrice");
  const sgst = watch("sgst");
  const cgst = watch("cgst");

  useEffect(() => {
    const total = calculateTotal(qty, unitPrice, sgst, cgst);
    setValue("total", total);
  }, [qty, unitPrice, sgst, cgst, setValue]);

  const formSubmit = (data) => {
    dispatch(editInvoice({id, formInputs:data}));
  };
  return (
    <form
      className="w-full max-w-[800px] mx-auto p-2 bg-zinc-200"
      onSubmit={handleSubmit(formSubmit)}
    >
      <h2 className="text-center my-2 capitalize font-bold text-primary-400">
        Update Invoice
      </h2>
      <div className=" w-full">
        <Input
          label="Enter Item"
          placeholder="Enter item"
          {...register("item", { required: "Item is required" })}
          error={errors.items}
        />
        <Input
          label="Enter Description"
          placeholder="Enter Description"
          {...register("description", { required: "Description is required" })}
          error={errors.description}
        />
        <Select
          label="Select HSA/SAC"
          placeholder="Select HSA/SAC"
          options={["HSA", "SAC"]}
          error={errors.hsaSac}
        />
        <Input
          type="number"
          label="Enter qty"
          placeholder="Enter qty"
          {...register("qty", {
            required: "Quantity is required",
            valueAsNumber: true,
          })}
          error={errors.qty}
        />
        <Input
          type="number"
          label="Enter unit Price (in Rs)"
          placeholder="Enter unit Price (in Rs)"
          {...register("unitPrice", {
            required: "Unit Price is required",
            valueAsNumber: true,
          })}
          error={errors.unitPrice}
        />
        <Input
          type="number"
          label="Enter SGST"
          placeholder="Enter SGST"
          {...register("sgst", {
            required: "SGST is required",
            valueAsNumber: true,
          })}
          error={errors.sgst}
        />
        <Input
          type="number"
          label="Enter CGST"
          placeholder="Enter CGST"
          {...register("cgst", {
            required: "CGST is required",
            valueAsNumber: true,
          })}
          error={errors.cgst}
        />
        <Input
          readOnly
          type="number"
          placeholder="--"
          label="Total"
          {...register("total")}
          error={errors.total}
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="my-2">
          Submit
        </Button>
        <span
          onClick={handleClose}
          className="my-2 bg-red-400 p-2 px-4 capitalize font-bold text-center text-white hover:bg-red-500 rounded-full"
        >
          cancel
        </span>
      </div>
    </form>
  );
};

export default EditInvoiceModal;
