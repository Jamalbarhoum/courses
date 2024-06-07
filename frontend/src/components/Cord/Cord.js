/* eslint-disable no-unused-vars */
import React,{useContext, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Reload from "../reload/Reload";
import "./Card.css";
import { Context } from "../../App";
import axios from "axios"
function Cord() {
  const { isLogin ,token} = useContext(Context);

  useEffect(()=>{
    
axios.get(`http://localhost:5000/courses/ `, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((result)=>{
  console.log(result);
}).catch((err)=>{
  console.log(err);
})

  },[])

  const redirect = useNavigate();
  return (
    <>
      {"toggle" ? (
        <div style={{height:"80vh", width:"100%",backgroundColor:"#fff",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <Reload />
        </div>
       
      ) : (
        <>
          <h2> {} </h2>
          {[]?.map((elm, index) => {
            return (
              <>
                <Card className="Card_vis">
                  <Card.Img
                    className="img_card"
                    style={
                      {
                        // paddingTop: "10px",
                        // width: "300px",
                        // height: "220px",
                      }
                    }
                    variant="top"
                    src={elm.image}
                  />
                  <Card.Body className="Card_body">
                    <Card.Title>{elm.address.slice(3)}</Card.Title>
                    <Card.Text>{elm.description.slice(0, 30)}</Card.Text>
                    <Card.Text>$ {elm.price}</Card.Text>
                    <Button
                      onClick={() => {
                        redirect({
                          pathname: "Info",
                          search: `?idx=${elm.id}`,
                        });
                      }}
                      variant="primary"
                    >
                      بيت
                    </Button>
                  </Card.Body>
                </Card>
              </>
            );
          })}
        </>
      )}
      {/* <div ref=""></div> */}
    </>
  );
}

export default Cord;
