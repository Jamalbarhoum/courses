import NavbarR from "./components/Navbar/NavbarR";

import { createContext, useEffect, useState } from "react";
import Cord from "./components/Cord/Cord";
import { Routes, Route } from "react-router";
import LoginInfo from "./components/Login/LoginInfo";
import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
export const Context = createContext();
function App() {
  useEffect(() => {
    localStorage.getItem("token");
  }, []);
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("token") || false
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  return (
    <>
      <Context.Provider
        value={{
          isLogin,
          setIsLogin,
          token,
          setToken,
        }}
      >
        <NavbarR />
        <Routes>
          <Route path="/login" element={<LoginInfo />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/" element={<Header />} />
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
