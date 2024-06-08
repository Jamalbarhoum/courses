import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { Context } from "../../App";
import "./table.css";
import axios from "axios";
import { Col, Image } from "react-bootstrap";
import FormTeacher from "../formTeacher/FormTeacher";
import { TiDelete } from "react-icons/ti";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function Teacher() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [toggle, setToggle] = useState(false);
  const [IdCourseForDelete,  setIdCourseForDelete] = useState(0);

  const [data, setData] = useState([]);
  const redirect = useNavigate();
  const { token, roleID } = useContext(Context);
  useEffect(() => {
    if (!token || roleID * 1 !== 2) {
      redirect("/");
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/courses/allPriv`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.result);
        setData(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteCourse = (id) => {
    axios
      .delete(`http://localhost:5000/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
        setData(
          data.filter((elm, index) => {
            return elm.id !== id;
          })
        
        );
        setIdCourseForDelete(0)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{margin:"40px 0px"}}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
         
          padding: "20px",
        }}
      >
        <button
          onClick={() => {
            setToggle(!toggle);
          }}
          className="btn btn-secondary"
        >
          add Course
        </button>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          padding: "20px",
        }}
      >
        {toggle && (
          <FormTeacher
            setDataCourses={setData}
            dataCourses={data}
            setToggleShowForm={setToggle}
            ToggleShowForm={toggle}
          />
        )}
      </div>

      <div className="cont-table">
        <table>
          <tr>
            <th>Course name</th>
            <th>description</th>
            <th>image</th>
            <th>Action</th>
          </tr>
          {data.map((elm, index) => {
            return (
              <>
                <tr>
                  <td>{elm.name}</td>
                  <td>{elm.description}</td>
                  <td>
                    {" "}
                    <Col style={{ width: "100%" }} xs={6} md={4}>
                      <Image
                        style={{ width: "100%", height: "300px" }}
                        src={elm.image}
                      />
                    </Col>
                  </td>
                  <td>
                    <Col style={{ width: "100%" }} xs={6} md={4}>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Delete or modify"
                      >
                        <Dropdown.Item
                          onClick={(e) => {
                            handleShow();
                            setIdCourseForDelete(elm.id)
                          }}
                        >
                          delete
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Update</Dropdown.Item>
                      </DropdownButton>
                    </Col>{" "}
                  </td>
                </tr>
              </>
            );
          })}
        </table>
  

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>delete Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>are sure of the deleting process</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                deleteCourse(IdCourseForDelete);
                handleClose();
              }}
              variant="primary"
            >
              delete Course
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Teacher;
