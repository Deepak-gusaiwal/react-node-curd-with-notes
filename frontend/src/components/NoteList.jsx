import React, { useEffect } from "react";
import { Container, DeleteNote, EditNote } from "./helper";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../redux/noteSlice";
import Loading from "./Loading";

const NoteList = () => {
  const { notes, fetchedStatus, statusVal } = useSelector(
    (state) => state.note
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (fetchedStatus == statusVal.idle) {
      dispatch(getNotes());
    }
  }, [fetchedStatus, dispatch]);

  return (
    <Container className="grid md:grid-cols-5 gap-2">
      {fetchedStatus == statusVal.loading && <Loading />}

      {notes.length > 0 ? (
        notes.map((note) => <NoteCard data={note} key={note._id} />)
      ) : (
        <span className="col-span-full text-primary-500 text-[16px] capitalize  font-bold">Please add some notes</span>
      )}
    </Container>
  );
};
const NoteCard = ({ data }) => {
  const { title, description, _id } = data;

  return (
    <div className="card p-2 capitalize bg-primary-50 shadow-md text-center">
      <h4 className="mb-1 text-primary-400 ">{title}</h4>
      <p className="text-zinc-600 lowercase">{description}</p>
      <div className="bottom flex gap-2 justify-between items-center mt-2">
      <DeleteNote id={_id}/>
      <EditNote id={_id}/>
      </div>
    </div>
  );
};
export default NoteList;
