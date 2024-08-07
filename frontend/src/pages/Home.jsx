import React from "react";
import { Section } from "../components/helper";
import { NoteForm, NoteList } from "../components";

const Home = () => {
  return (
    <>
      <Section>
        <NoteForm />
        <hr />
        <NoteList/>
      </Section>
    </>
  );
};

export default Home;
