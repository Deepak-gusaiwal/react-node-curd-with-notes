import React from "react";
import { Container, Section } from "../components/helper";
import { AuthForm } from "../components";

const Signup = () => {
  return (
    <Section>
      <Container>
        <AuthForm type="signup" />
      </Container>
    </Section>
  );
};

export default Signup;
