import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleNoteModal } from "../../redux/baseSlice";
const EditNote = ({ className = "", id }) => {
  const { showNoteModal } = useSelector((state) => state.base);
  const dispatch = useDispatch();
  const handleEdit = () => {
    dispatch(toggleNoteModal({ view: true, id }));
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

export default EditNote;
