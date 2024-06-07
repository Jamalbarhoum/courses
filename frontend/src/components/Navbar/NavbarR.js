import React, { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import "./Nav.css"
import { Context } from "../../App";
import { useNavigate } from "react-router";

function NavbarR() {
  const redirect = useNavigate()
  const { isLogin,setIsLogin,setToken } = useContext(Context);
  return (
    <div>
      {" "}
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand>Navbar</Navbar.Brand>
          <Nav className="ma-auto">
            <Nav.Link onClick={()=>{
                   redirect("/")
            }}>Home</Nav.Link>
            {!isLogin ? (
              <Nav>
                <Nav.Link onClick={()=>{
                  redirect("/login")
             
                }}>Login</Nav.Link>
                <Nav.Link>Register</Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link onClick={()=>{
                  redirect("/courses")
                }}>Courses</Nav.Link>
                <Nav.Link onClick={()=>{
                  localStorage.clear()
                  setIsLogin(false)
                  setToken(null)
                }} >Logout</Nav.Link>
              </Nav>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarR;
