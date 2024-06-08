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
import Reload from "../reload/Reload";
function Teacher() {
  const [DataForUpdate, setDataForUpdate] = useState({});

  const [image_URL, set_image_URL] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShow(false);
  const handleShowUpdate = () => setShow(true);

  const [toggle, setToggle] = useState(false);
  const [IdCourseForDelete, setIdCourseForDelete] = useState(0);

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
        setIdCourseForDelete(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCourse = (id) => {
    axios
      .put(`http://localhost:5000/courses/${id}`, DataForUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setData(data.map((elm,index)=>{
            if(elm.id == DataForUpdate.id){
                elm = DataForUpdate
               
            }
            return elm
        }))
        setDataForUpdate({})
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileUpdatePost = (e, Action) => {
    setDataForUpdate({ ...DataForUpdate, image: "" });
    const pr_key = "rllytlm7";
    const cloud_name = "dmmo3zzyc";

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", pr_key);

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/${Action}/upload`,
        formData
      )
      .then((result) => {
        setDataForUpdate({ ...DataForUpdate, image: result.data.secure_url });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {data.length === 0 && (
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
      )}

      <div style={{ margin: "40px 0px" }}>
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
                              setIdCourseForDelete(elm.id);
                            }}
                          >
                            delete
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setDataForUpdate(elm);
                              handleShowUpdate();
                            }}
                          >
                            Update
                          </Dropdown.Item>
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
          <Modal show={show} onHide={handleCloseUpdate}>
            <Modal.Header closeButton>
              <Modal.Title>Update Course</Modal.Title>
            </Modal.Header>
            <div className="formUpdate">
              <input
                onChange={(e) => {
                  setDataForUpdate({ ...DataForUpdate, name: e.target.value });
                }}
                value={DataForUpdate.name}
                placeholder="Course name"
                type="text"
              />
              <input
                onChange={(e) => {
                  setDataForUpdate({
                    ...DataForUpdate,
                    description: e.target.value,
                  });
                }}
                value={DataForUpdate.description}
                placeholder="description"
                type="text"
              />
              <input
                onChange={(e) => {
                  if (e.target.files[0].type === "video/mp4") {
                    handleFileUpdatePost(e, "video");
                  } else {
                    handleFileUpdatePost(e, "image");
                  }
                }}
                type="file"
                class="input-file"
              />
              <div style={{ width: "200px" }}>
                {DataForUpdate.image ? (
                  <img style={{ width: "100%" }} src={DataForUpdate.image} />
                ) : (
                  <div
                    style={{
                      height: "20vh",
                      width: "100%",
                      backgroundColor: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Reload />
                  </div>
                )}
              </div>
            </div>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseUpdate}>
                Close
              </Button>
              <Button onClick={() => {
                handleCloseUpdate()
                updateCourse(DataForUpdate.id)
              }} variant="primary">
                Update Course
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Teacher;
