import axios from "axios";
import React, { useState, useContext  } from "react";
import { MdDelete } from "react-icons/md";
import "./Form.css";
import Reload from "../reload/Reload";
import { Context } from "../../App";
function FormTeacher({setDataCourses,dataCourses,ToggleShowForm ,setToggleShowForm}) {
    const {token} = useContext(Context)
  const [image_URL, set_image_URL] = useState("");
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState({
    name: null,
    description: null,
    image: null,
  });



  const createNewCourse = ()=>{
    console.log(token);
    axios.post(`http://localhost:5000/courses/`,data,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((result)=>{
        console.log(result.data.result[0]);
        setDataCourses([result.data.result[0],...dataCourses])

      }).catch((err)=>{
        console.log(err);
      })

  }














  const handleFileUpdatePost = (e, Action) => {
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
        set_image_URL(result.data.secure_url);
        setData({...data,image:result.data.secure_url})
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input onChange={(e)=>{
            setData({...data,name:e.target.value})
        }} placeholder="name" />
        <input onChange={(e)=>{
            setData({...data,description:e.target.value})
        }}  placeholder="description" />
        {!image_URL && toggle ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            <Reload />
          </div>
        ) : (
          ""
        )}
        {!image_URL ? (
          <input
            onChange={(e) => {
              if (e.target.files[0].type === "video/mp4") {
                handleFileUpdatePost(e, "video");
                setToggle(true);
              } else {
                handleFileUpdatePost(e, "image");
                setToggle(true);
              }
            }}
            type="file"
            class="input-file"
          />
        ) : (
          <div>
            <MdDelete
              onClick={() => {
                set_image_URL("");
                setToggle(false);
              }}
              style={{
                cursor:"pointer",
                zIndex:10,
                color: "red",
                fontSize: "30px",
                position: "absolute",
                border: "3px solid #000",
                backgroundColor:"#fff",
                margin: "10px",
              
              }}
            />
            <img style={{ width: "400px",height:"350px" }} src={image_URL} />
          </div>
        )}
        <input onClick={(e)=>{
            e.preventDefault()
            if(data.name && data.description && data.image){
                setToggleShowForm(!ToggleShowForm)
                createNewCourse()

            }
         
        }} type="submit" />
      </form>
    </div>
  );
}

export default FormTeacher;
