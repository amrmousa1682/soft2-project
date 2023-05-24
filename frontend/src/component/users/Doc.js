import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "better-react-carousel";
import b1 from "./../../img/book1.png";
const Doctor = () => {
  const inlineStyles = {
    color: "red",
    fontSize: "16px",
    backgroundColor: "#9A616D",
    padding: "10px",
    borderRadius: "5px",
    width: "85%",
  };
  const head = {
    marginTop: "10%",
    marginBottom: "10%",
    textAlign: "center",
    color: "#9A616D",
  };
  const imgstyle = {
    width: "40%",
    height: "40%",
  };
  const [subjects, setSubjects] = useState([]);
  if (subjects.length === 0)
    axios
      .get("http://localhost:5000/doctor/subjects", {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
      .then((res) => {
        setSubjects(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert(err.response.data.message);
          localStorage.removeItem("Authorization");
          window.location.reload(false);
        } else alert(err.response.data.message);
      });
  const addFileHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios
      .post(`http://localhost:5000/doctor/file/${e.target.file.id}`, formData, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
        onUploadProgress:(event)=>{console.log(event.total,event.loaded)}
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert(err.response.data.message);
          localStorage.removeItem("Authorization");
          window.location.reload(false);
        } else alert(err.response.data.message);
      });
  };
  return (
    <div>
      <div>
        <h2 style={head}> Doctor Page</h2>
      </div>
      <Carousel cols={4} rows={2} gap={1} loop>
        {subjects.map((ele) => {
          return (
            <Carousel.Item key={ele.id}>
              <img style={imgstyle} src={b1} alt="" />
              <p>{ele.name}</p>
              <form onSubmit={addFileHandler}>
                <input
                  type="file"
                  name="file"
                  id={ele.id}
                  style={inlineStyles}
                />
                <button type="submit"> upload </button>
              </form>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <br /> <br /> <br />
    </div>
  );
};
export default Doctor;
