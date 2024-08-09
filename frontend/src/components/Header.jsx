import React, { useState } from "react";
import { Button, Container, Logo } from "./helper";
import { Link } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";
import { MdOutlineLogout, MdLogin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";

const Header = ({ className = "" }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { loggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handdleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  return (
    <header className={`flex items-center ${className}`}>
      <Container className=" flex gap-2 justify-between h-full p-0">
        <Logo className="logo flex w-[clamp(120px,15%,250px)] flex-shrink-0 justify-center border-y-4 border-primary-400" />
        <ul className={`menu duration-300  ${showMenu ? "active" : ""}`}>
          <li>
            <Link onClick={handdleShowMenu} to="/">
              Home
            </Link>
          </li>
          <li>
          <Link onClick={handdleShowMenu} to="/invoice">Invoice</Link>
          </li>
        </ul>
        {/* contact button */}
        <div className="buttons flex items-center gap-2 ml-auto">
          {loggedIn ? (
            <>
              <Button onClick={logoutHandler} varient>
                <span className="md:inline hidden">Logout</span>{" "}
                <MdOutlineLogout />
              </Button>
            </>
          ) : (
            <>
              <Button className="" varient={{}} to="/signup">
                <span className="md:flex hidden">Signup</span>{" "}
                <IoPersonAdd className="text-white " />
              </Button>
              <Button className="" to="/login">
                <span className="md:flex hidden">login</span>
                <MdLogin className="text-white " />
              </Button>
            </>
          )}
        </div>

        <div
          onClick={handdleShowMenu}
          className={`navToggler md:hidden flex ${showMenu ? "active" : ""}`}
        >
          <span></span>
          <p>menu</p>
          <span></span>
        </div>
      </Container>
    </header>
  );
};

export default Header;
