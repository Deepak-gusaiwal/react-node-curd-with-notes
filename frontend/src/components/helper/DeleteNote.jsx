import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deleteNote } from "../../redux/noteSlice";
const DeleteNote = ({ className = "", id }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    isConfirmed && dispatch(deleteNote(id));
  };
  return (
    <div
      className={`p-1 flex justify-center items-center bg-red-500 hover:bg-red-600 cursor-pointer w-fit rounded shadow-md text-white ${className}`}
      onClick={handleDelete}
    >
      <AiFillDelete />
    </div>
  );
};

export default DeleteNote;
