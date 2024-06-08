/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Reload from "../reload/Reload";
import "./Card.css";
import { Context } from "../../App";
import axios from "axios";
function Cord() {
  const redirect = useNavigate();
  const { isLogin, token } = useContext(Context);
  const [data_courses, setDataCourses] = useState([]);
  const goHome = () => {
    redirect("/");
  };

  useEffect(() => {
    if (!isLogin) {
      goHome();
    }
    axios
      .get(`http://localhost:5000/courses/ `, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setTimeout(() => {
          setDataCourses(result.data.result);
        }, 0);
        // console.log(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setDataCourses([]);
    };
  }, []);

  return (
    <>
      {data_courses.length === 0 ? (
        <div
          style={{
            height: "80vh",
            width: "100%",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Reload />
        </div>
      ) : (
        <>
          {data_courses?.map((elm, index) => {
            return (
              <>
                <Card className="Card_vis">
                  <Card.Img
                    className="img_card"
                    variant="top"
                    src={elm.image}
                  />
                  <Card.Body className="Card_body">
                    <Card.Title>{elm.name}</Card.Title>
                    <Card.Text>{elm.description.slice(0, 30)}</Card.Text>
                    {/* <Card.Text>$ {elm.price}</Card.Text> */}
                    <Button
                      onClick={() => {
                        redirect({
                          pathname: "Info",
                          search: `?idx=${elm.id}`,
                        });
                      }}
                      variant="primary"
                    >
                      GO
                    </Button>
                  </Card.Body>
                </Card>
              </>
            );
          })}
        </>
      )}
    </>
  );
}

export default Cord;
