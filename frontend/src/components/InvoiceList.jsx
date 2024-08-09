import React, { useEffect } from "react";
import { Container, DeleteInvoice } from "./helper";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices, toggleInvoiceModal } from "../redux/invoiceSlice";
import { AiFillEdit } from "react-icons/ai";

const InvoiceList = () => {
  const { invoices, fetchedStatus, statusVal } = useSelector(
    (state) => state.invoice
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (fetchedStatus == statusVal.idle) {
      dispatch(fetchInvoices());
    }
  }, [fetchedStatus]);

  const grandTotal = invoices
    .reduce((acc, invoice) => {
      const itemTotal = parseFloat(invoice.item.total) || 0; // Ensure it's a number
      return acc + itemTotal;
    }, 0)
    .toFixed(2); // Format to 2 decimal places
  return (
    <Container>
      <h4 className="uppercase font-bold text-center my-2 text-primary-400">
        Invoice List of {user.username}
      </h4>

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

            {fetchedStatus == statusVal.loading && (
              <tr>
                <td colSpan={9}>
                  <span className="text-center block text-primary-500 capitalize">
                    fetching....
                  </span>
                </td>
              </tr>
            )}
            {invoices.length > 0 &&
              invoices.map((invoice, index) => (
                <tr key={invoice._id}>
                  <td>{invoice.item.item}</td>
                  <td>{invoice.item.description}</td>
                  <td>{invoice.item.hsaSac}</td>
                  <td>{invoice.item.qty}</td>
                  <td>{invoice.item.unitPrice}</td>
                  <td>{invoice.item.sgst}</td>
                  <td>{invoice.item.cgst}</td>
                  <td>{invoice.item.total}</td>
                  <td>
                    <span className="flex gap-2">
                      <DeleteInvoice id={invoice._id} />
                      <EditInvoiceButton id={invoice._id} />
                    </span>
                  </td>
                </tr>
              ))}
            <tr className="bg-green-500 text-white text-center font-bold">
              <td colSpan="7">Grand Total</td>
              <td colSpan="2" className="select-text">
                {invoices.length > 0 ? `Rs ${grandTotal}` : "--"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  );
};

const EditInvoiceButton = ({ id, className = "" }) => {
  const dispatch = useDispatch();
  const handleEdit = () => {
    dispatch(toggleInvoiceModal({ view: true, id }));
  };
  return (
    <div
      className={`p-1 flex justify-center items-center bg-yellow-500 hover:bg-yellow-600 cursor-pointer w-fit rounded shadow-md text-white ${className}`}
      onClick={handleEdit}
    >
      <AiFillEdit />
    </div>
  );
};

export default InvoiceList;
