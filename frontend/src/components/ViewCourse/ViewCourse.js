import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import "./ViewCourse.css";
import { Container } from "react-bootstrap";
function ViewCourse() {
  const [data_course, setDataCourse] = useState({});
  const redirect = useNavigate();
  const { token } = useContext(Context);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("idx");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/courses/solo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setDataCourse(result.data.result);
      })
      .catch((err) => {
        redirect("/");
        console.log(err);
      });
  });
  return (
    <>
      {data_course ? (
        <>
          <div>
            <img
              className="img-header-1Course"
              style={{ width: "100%", height: "300px" }}
              src={data_course.image}
            />
            <br />
            <div style={{ width: "100%" }}>
              <h2 style={{ textAlign: "center", padding: "20px" }}>
                {data_course.name}
              </h2>
            </div>

            <hr />
            <br />
            <Container>
              <div
                className="cont-viw-one-course"
                style={{ display: "flex", gap: "20px", width: "100%" }}
              >
                <img style={{ width: "50%", height:"500px" }} src={data_course.image} />
                <p style={{ width: "50%" }}>{data_course.description}</p>
              </div>
            </Container>
          </div>
        </>
      ) : (
        <div style={{ width: "100%", height: "90vh" }}>
          <img src="page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg" />
        </div>
      )}
    </>
  );
}

export default ViewCourse;
