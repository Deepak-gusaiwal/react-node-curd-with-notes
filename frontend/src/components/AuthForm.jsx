import React, { useEffect } from "react";
import { Button, Input, Sheading } from "./helper";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ type = "login" }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formSubmit = async (inputs) => {
    const { username, email, password } = inputs;
    type == "signup"
      ? dispatch(signupUser(inputs))
      : dispatch(loginUser(inputs));
  };

  // navigate user to dashboard if he already logged in /sign up
  const { loggedIn, status, statusVal } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [status, loggedIn]);
  return (
    <div className="authform py-4">
      <Sheading
        heading={type == "signup" ? "Signup" : "Login"}
        className="text-center mb-2"
        variant
      />

      <form
        className="max-w-[400px] mx-auto flex flex-col gap-2 p-4 bg-zinc-100 rounded"
        onSubmit={handleSubmit(formSubmit)}
      >
        {type == "signup" && (
          <Input
            label="Name"
            placeholder="Enter Name"
            {...register("username", { required: "Name is required" })}
            error={errors.name}
          />
        )}
        <Input
          label="Your ID"
          placeholder="Enter Your ID"
          {...register("email", { required: "Login ID is required" })}
          error={errors.email}
        />
        <Input
          label="Your Password"
          placeholder="Enter Your Password"
          {...register("password", { required: "Passowrd is required" })}
          error={errors.password}
        />
        <Button className="">{type == "signup" ? "Signup" : "Login"}</Button>
      </form>
    </div>
  );
};

export default AuthForm;
