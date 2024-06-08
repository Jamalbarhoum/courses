import React from "react";
import { Container } from "react-bootstrap";
import Mems from "../mems/Mems";
import "./header.css"

function Header() {

  return (
    <div  className="up" >
             <Mems />
      <Container style={{display:"flex",height:"90vh",alignItems:"center", justifyContent:"center"}} className="Container-header">
      
        <div style={{width:"350px"}} className="Left side">
      
          <h1 style={{fontSize:"20px"}} className="content-header">We help you learn the best programming languages ​​quickly with the best courses</h1>
      
          
        </div>
        <div className="Right-side">
          
          <img className="image-header" src="https://modo3.com/thumbs/fit630x300/93604/1480889132/%D8%AA%D8%B9%D9%84%D9%85_%D9%84%D8%BA%D8%A9_%D8%A7%D9%84%D8%A8%D8%B1%D9%85%D8%AC%D8%A9.jpg" alt="no result" />
        </div>
        
      </Container>
      <Container>
      <div class="container" >
        <div class="section">
            <h2>About the Site</h2>
            <p>The Code Learning Site offers a wide range of comprehensive courses in various programming languages.</p>
        </div>
        <div class="section">
            <h2>Courses</h2>
            <p>Explore our available courses and learn to code applications and websites from scratch.</p>
        </div>
        <div class="section">
            <h2>Students</h2>
            <p>Read success stories of students who learned coding through our site and achieved remarkable accomplishments.</p>
        </div>
        <div class="section">
            <h2>Teachers</h2>
            <p>Meet our team of specialized teachers and benefit from their extensive experience in the field of programming.</p>
        </div>
    </div>
      </Container>
    </div>
  );
}

export default Header;
