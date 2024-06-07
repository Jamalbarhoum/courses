import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useState } from "react";
function NavbarR() {
  const [isLogin ,setIsLogin] = useState(localStorage.getItem("token") || false)
  return (
    <div>
      {" "}
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="ma-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            { !isLogin? (
                  <Nav>
              <Nav.Link href="#features">Login</Nav.Link>
              <Nav.Link href="#features">Register</Nav.Link>
              </Nav>
            ) : (
              <Nav>
                  <Nav.Link href="#pricing">Courses</Nav.Link>
                  <Nav.Link href="#features">Logout</Nav.Link>
            
              </Nav>
            )}

           
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarR;
