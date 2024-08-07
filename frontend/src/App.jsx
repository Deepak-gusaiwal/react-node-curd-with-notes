import React, { useEffect } from "react";
import { Footer, Header, Loading } from "./components";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Protected, Signup } from "./pages/";
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "./redux/authSlice";
import { EditNoteModal } from "./components/helper";

const App = () => {
  const { status, error, statusVal } = useSelector((state) => state.auth);
  const { showNoteModal } = useSelector((state) => state.base);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === statusVal.idle) {
      dispatch(getSession());
    }
  }, [status]);
  return (
    <>
      {showNoteModal.view && <EditNoteModal />}
      {status == statusVal.loading && (
        <Loading className="fixed z-[9999] text-xl  text-white backdrop-blur-sm" />
      )}
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Protected />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<h1>404 || Page Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
