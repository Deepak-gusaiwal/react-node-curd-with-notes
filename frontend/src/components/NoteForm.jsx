import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Input } from "./helper";
import { useDispatch, useSelector } from "react-redux";
import { addNote, editNote } from "../redux/noteSlice";
import { toggleNoteModal } from "../redux/baseSlice";

const NoteForm = ({ modal, data }) => {
  const { createStatus, statusVal } = useSelector((state) => state.note);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = async (inputs) => {
    modal
      ? dispatch(editNote({ id: data._id, formInputs: inputs }))
      : dispatch(addNote(inputs));

    reset();
  };

  const handelCloseModal = () => {
    dispatch(toggleNoteModal({ view: false, id: null }));
  };

  useEffect(() => {
    setValue("title", data?.title);
    setValue("description", data?.description);
  }, [data]);
  return (
    <Container>
      <form
        className="max-w-[800px] mx-auto flex flex-col gap-2 p-4 bg-zinc-100 rounded"
        onSubmit={handleSubmit(formSubmit)}
      >
        <h1 className="text-center text-secondary-400 capitalize">
          {modal ? "Update your note" : "Add Your Note"}
        </h1>
        <Input
          label="title"
          placeholder="Enter title"
          {...register("title", { required: "title is required" })}
          error={errors.title}
        />

        <Input
          label="description"
          placeholder="Enter description"
          {...register("description", { required: "description is required" })}
          error={errors.description}
        />

        <div className="flex gap-2 justify-center items-center">
          <Button className="w-fit md:px-8">
            {modal ? "update Note" : "Add note"}
          </Button>
          {modal && (
            <button
              onClick={handelCloseModal}
              className="w-fit bg-primary-400 hover:bg-primary-500 text-white capitalize p-2 px-4 rounded-full"
            >
              cancel
            </button>
          )}
        </div>
      </form>
    </Container>
  );
};

export default NoteForm;
