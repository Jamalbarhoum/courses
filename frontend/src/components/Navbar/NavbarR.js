import React, { useContext, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import "./Nav.css";
import { Context } from "../../App";
import { useNavigate } from "react-router";


function NavbarR() {
  const redirect = useNavigate();
  const { isLogin, setIsLogin, setToken, roleID } = useContext(Context);

  return (
    <div>
      {" "}
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand>Navbar</Navbar.Brand>
          <Nav className="ma-auto">
            <Nav.Link
              onClick={() => {
                redirect("/");
              }}
            >
              Home
            </Nav.Link>
            {!isLogin ? (
              <Nav>
                <Nav.Link
                  onClick={() => {
                    redirect("/login");
                  }}
                >
                  Login
                </Nav.Link>
                <Nav.Link onClick={()=>{
                  redirect("/Register")
                }}>Register</Nav.Link>
            
              </Nav>
            ) : (
              <Nav>
                <Nav.Link
                  onClick={() => {
                    redirect("/courses");
                  }}
                >
                  Courses
                </Nav.Link>
                {roleID * 1 == 2 ? <Nav.Link>teacher</Nav.Link>:<Nav.Link>student</Nav.Link>}
                <Nav.Link
                  onClick={() => {
                    localStorage.clear();
                    setIsLogin(false);
                    setToken(null);
                    redirect("/")
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
