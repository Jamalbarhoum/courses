import React, { useContext, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import "./Nav.css";
import { Context } from "../../App";
import { useNavigate } from "react-router";

function NavbarR() {
  const redirect = useNavigate();
  const { isLogin, setIsLogin, setToken, roleID } = useContext(Context);

  return (
    <div style={{ width:"100%"}}>
      {" "}
      <Navbar style={{ backgroundColor: "rgb(83,92,112)" }}>
        <Container>
          <Navbar.Brand style={{ color: "#fff" ,width:"80px" ,position:"relative"}}>
            <img style={{width:"100%",position:"absolute",top:"-35px"}} src="Logo.svg"/>
          </Navbar.Brand>
          <Nav className="ma-auto">
            <Nav.Link
              style={{ color: "#fff" }}
              onClick={() => {
                redirect("/");
              }}
            >
              Home
            </Nav.Link>
            {!isLogin ? (
              <Nav>
                <Nav.Link
                  style={{ color: "#fff" }}
                  onClick={() => {
                    redirect("/login");
                  }}
                >
                  Login
                </Nav.Link>
                <Nav.Link       style={{ color: "#fff" }}
                  onClick={() => {
                    redirect("/Register");
                  }}
                >
                  Register
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link
                  style={{ color: "#fff" }}
                  onClick={() => {
                    redirect("/courses");
                  }}
                >
                  Courses
                </Nav.Link>
                {roleID * 1 == 2 ? (
                  <Nav.Link
                    style={{ color: "#fff" }}
                    onClick={() => {
                      redirect("/Teacher");
                    }}
                  >
                    Teacher Dashboard
                  </Nav.Link>
                ) : (
                  <Nav.Link>student</Nav.Link>
                )}
                <Nav.Link
                  style={{ color: "#fff" }}
                  onClick={() => {
                    localStorage.clear();
                    setIsLogin(false);
                    setToken(null);
                    redirect("/");
                  }}
                >
                  Logout
                </Nav.Link>
              </Nav>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarR;
