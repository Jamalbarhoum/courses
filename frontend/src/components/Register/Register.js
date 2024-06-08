import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
function Register() {
  const redirect = useNavigate();

  const [data, setData] = useState({
    username: null,
    password: null,
    email: null,
    role: null,
  });

  const [messageError ,setMessageError] = useState(null)
  const [Success,setSuccess]= useState("")

const Register = ()=>{
    axios
    .post(`http://localhost:5000/user/Register`, data)
    .then((result) => {
      console.log(result);
      setMessageError(null)
      setSuccess(result.data.message)
 
    
    })
    .catch((err) => {
        setMessageError(err.response.data.message )
    });

}
   

  return (
    <>
      <Container>
        <div className="cont-form">
          <form class="form" style={{height:"120%"}}>
            <p id="heading">Register</p>
            <div class="field">
              <input
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
                autocomplete="off"
                placeholder="email"
                class="input-field"
                type="email"
              />
            </div>
            <div class="field">
              <input
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
                placeholder="Password"
                class="input-field"
                type="password"
              />
            </div>
            <div class="field">
              <input
                onChange={(e) => {
                  setData({ ...data, username: e.target.value });
                }}
                placeholder="username"
                class="input-field"
                type="username"
              />
            </div>
            <div class="field">
              <input
                onChange={(e) => {
                  setData({ ...data, role: e.target.value });
                }}
                placeholder="role id"
                class="input-field"
                type="number"
              />
            </div>
            <div class="btn">
              <button
                onClick={(e) => {
                  e.preventDefault();

                  redirect("/Login");
                }}
                class="button1"
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
              <button style={{backgroundColor:"green"}}
                class="button2"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(data);
                  Register()
                }}
              >
                Register
              </button>
            </div>
            
            <button
              class="button3"
              onClick={() => {
                redirect("/");
              }}
            >
              back
            </button>
            { messageError?  <p style={{ color: "red" }}>{ messageError}</p> :  <p style={{ color: "green" }}>{Success}</p>}
          
           
          </form>
        </div>
      </Container>
    </>
  );
}

export default Register;
