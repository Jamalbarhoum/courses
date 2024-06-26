import React, { useState,useContext, useEffect } from "react";
import "./LoginInfo.css";
import { Context } from "../../App";
import Login, { Render } from "react-login-page";
import Logo from "react-login-page/logo";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function LoginInfo() {



  const {setToken,token,setIsLogin ,setRoleID} = useContext(Context)
  const redirect = useNavigate();
  const [messageError,setMessageError] = useState("")
  const [data, setData] = useState({
    password: null,
    email: null,
  });


useEffect(()=>{
  if(token){
    redirect("/")
  }
},[])






  const login = ()=>{
 
    axios.post('http://localhost:5000/user/login',data).then((result)=>{
        console.log(result.data.role);
        localStorage.setItem("R",result.data.role)
        setRoleID(localStorage.getItem("R") *1)
        localStorage.setItem("token",result.data.token)
        setToken(localStorage.getItem("token"))
      
     
      
        setIsLogin(true)
        redirect("/")
       
    }).catch((err)=>{
      setMessageError(err.response.data.message)
      
    })
  }
  return (
    <>
      <Container>
        <div className="cont-form">
          <form class="form">
            <p id="heading">Login</p>
            <div class="field">
              <svg
                class="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
              </svg>
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
              <svg
                class="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
              </svg>
              <input
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
                placeholder="Password"
                class="input-field"
                type="password"
              />
            </div>
            <div class="btn">
              <button style={{backgroundColor:"green"}} onClick={(e)=>{
                e.preventDefault()
                login()
                console.log(data);

              }} class="button1">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
              <button class="button2"    onClick={(e) => {
                e.preventDefault()
                redirect("/Register");
              }}>Register</button>
            </div>
            <button
              class="button3"
              onClick={(e) => {
                e.preventDefault()
                redirect("/");
              }}
            >
              back
            </button>
            <p style={{color:"red"}}>{messageError||messageError}</p>
          </form>
        </div>
      </Container>
    </>
  );
}

export default LoginInfo;
