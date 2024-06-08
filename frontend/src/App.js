import NavbarR from "./components/Navbar/NavbarR";
import "./app.css"
import { createContext, useEffect, useState } from "react";
import Cord from "./components/Cord/Cord";
import { Routes, Route } from "react-router";
import LoginInfo from "./components/Login/LoginInfo";
import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import Register from "./components/Register/Register";
import Teacher from "./components/teacher/Teacher";
import Footer from "./components/footer/Footer";
export const Context = createContext();
function App() {
  useEffect(() => {
    localStorage.getItem("token");
  }, []);
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("token") || false
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [roleID ,setRoleID] = useState(localStorage.getItem("R")|| 0)
  return (
    <>
      <Context.Provider
        value={{
          isLogin,
          setIsLogin,
          token,
          setToken,
          roleID ,
          setRoleID
        }}
      >
        <NavbarR />
        <Routes>
          <Route path="/login" element={<LoginInfo />} />
          <Route path="//Register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/Teacher" element={<Teacher />} />
          <Route path="/" element={<Header />} />
          <Route path="/" element={<Header />} />
        </Routes>
        <Footer/>
      </Context.Provider>
    </>
  );
}

export default App;
