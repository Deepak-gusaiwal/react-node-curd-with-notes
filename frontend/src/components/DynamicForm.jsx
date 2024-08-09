import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Input, Select, Button, Container, Sheading } from "./helper";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addInvoice } from "../redux/invoiceSlice";

const DynamicForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      items: [
        {
          item: "",
          description: "",
          hsaSac: "",
          qty: "1",
          unitPrice: "0",
          sgst: "0",
          cgst: "0",
          total: "0",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

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
  const formSubmit = (data) => {
    const updatedItems = data.items.map((item) => ({
      ...item,
      total: calculateTotal(item.qty, item.unitPrice, item.sgst, item.cgst),
    }));
    dispatch(addInvoice({ items: updatedItems }));
    reset();
  };

  return (
    <Container>
      <Sheading heading="invoice form" className="text-center" />
      <form onSubmit={handleSubmit(formSubmit)} action="">
        <div className="flex gap-2 invoiceFormContainer">
          <table>
            <tbody>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>HSA/SAC</th>
                <th>Qty</th>
                <th>Unit Price (in Rs)</th>
                <th>SGST (in %)</th>
                <th>CGST (in %)</th>
                <th>Total (in Rs)</th>
                <th>Action</th>
              </tr>
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td>
                    <Input
                      placeholder="Enter item"
                      {...register(`items[${index}].item`, {
                        required: "item is required",
                      })}
                      error={errors.items && errors.items[index]?.item}
                    />
                  </td>
                  <td>
                    <Input
                      placeholder="Enter Description"
                      {...register(`items[${index}].description`, {
                        required: "description is required",
                      })}
                      error={errors.items && errors.items[index]?.description}
                    />
                  </td>
                  <td>
                    <Select
                      placeholder="Select HSA/SAC"
                      options={["HSA", "SAC"]}
                      {...register(`items[${index}].hsaSac`, {
                        required: "HSA/SAC is required",
                      })}
                      error={errors.items && errors.items[index]?.hsaSac}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      defaultValue="1"
                      placeholder="Enter qty"
                      {...register(`items[${index}].qty`, {
                        required: "qty is required",
                      })}
                      error={errors.items && errors.items[index]?.qty}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      defaultValue="0"
                      placeholder="Enter unit Price (in Rs)"
                      {...register(`items[${index}].unitPrice`, {
                        required: "unitPrice is required",
                      })}
                      error={errors.items && errors.items[index]?.unitPrice}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      defaultValue="0"
                      placeholder="Enter SGST"
                      {...register(`items[${index}].sgst`, {
                        required: "sgst is required",
                      })}
                      error={errors.items && errors.items[index]?.sgst}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      defaultValue="0"
                      placeholder="Enter CGST"
                      {...register(`items[${index}].cgst`, {
                        required: "cgst is required",
                      })}
                      error={errors.items && errors.items[index]?.cgst}
                    />
                  </td>
                  <td>
                    {/* <Input
                    type="number"
                    defaultValue="0"
                    placeholder="--"
                    {...register(`items[${index}].total`, {
                      required: "total is required",
                    })}
                    error={errors.items && errors.items[index]?.total}
                  /> */}

                    <Controller
                      control={control}
                      name={`items[${index}].total`}
                      render={({ field }) => {
                        const qty = parseFloat(
                          watch(`items[${index}].qty`) || 0
                        );
                        const unitPrice = parseFloat(
                          watch(`items[${index}].unitPrice`) || 0
                        );
                        const sgst = parseFloat(
                          watch(`items[${index}].sgst`) || 0
                        );
                        const cgst = parseFloat(
                          watch(`items[${index}].cgst`) || 0
                        );
                        field.value = calculateTotal(
                          qty,
                          unitPrice,
                          sgst,
                          cgst
                        );
                        return (
                          <Input
                            type="number"
                            value={field.value}
                            readOnly
                            placeholder="--"
                            error={errors.items && errors.items[index]?.total}
                          />
                        );
                      }}
                    />
                  </td>
                  <td>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        className="my-2 aspect-square bg-primary-500 hover:bg-primary-600"
                      >
                        <MdClose />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <span
          className=" font-bold flex justify-center items-center p-1 my-2 text-white capitalize bg-green-400 hover:bg-green-500  rounded-full"
          type="button"
          onClick={() =>
            append({
              item: "",
              description: "",
              hsaSac: "",
              qty: "1",
              unitPrice: "0",
              sgst: "0",
              cgst: "0",
              total: "0",
            })
          }
        >
          add more +
        </span>

        <Button type="submit" className="my-2">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default DynamicForm;
