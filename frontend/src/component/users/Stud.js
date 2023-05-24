import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import b1 from "./../../img/book1.png";
import "./Stud.css";
const Student = () => {
  const [subjects, setSubjects] = useState([]);
  const loadSubjects = () => {
    axios
      .get("http://localhost:5000/student/subjects", {
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
  };
  useEffect(() => {
    loadSubjects();
  }, []);

  const enrollHandler = (e) => {
    axios
      .post(
        `http://localhost:5000/student/enrollment/${e.target.id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      )
      .then((res) => {
        alert(res.data.message);
        loadSubjects();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert(err.response.data.message);
          localStorage.removeItem("Authorization");
          window.location.reload(false);
        } else alert(err.response.data.message);
      });
  };
  const viewHandler = (id, index) => {
    axios
      .get(`http://localhost:5000/student/class/${id}`, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
      .then((res) => {
        setSubjects((prev) => {
          const newSubjects = [...prev];
          newSubjects[index].files = res.data;
          return newSubjects;
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert(err.response.data.message);
          localStorage.removeItem("Authorization");
          window.location.reload(false);
        } else alert(err.response.data.message);
      });
  };
  const downloadHadler = (e) => {
    const fileName = e.target.parentElement.children[3].value;
    axios
      .get(
        `http://localhost:5000/student/download/${e.target.id}/${fileName}`,
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
          responseType:"blob"
        }
      )
      .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          console.log(res.data)
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert(err.response.data.message);
          localStorage.removeItem("Authorization");
          window.location.reload(false);
        } else alert(err.response.data.message);
      });;
  };
  return (
    <div className="studPage">
      <h2> Student Page</h2>
      <div className=" container">
        <div className="row">
          {subjects.map((ele, index) => {
            return (
              <div className="card col-md-2 " key={ele.id}>
                <img width="40%" src={b1} alt="" />
                <p>name: {ele.name}</p>
                <p>code: {ele.code}</p>
                {!ele.isEnroll && (
                  <button onClick={enrollHandler} id={ele.id}>Enroll</button>
                )}
                {ele.isEnroll &&
                  ele.files === undefined &&
                  viewHandler(ele.id, index)}
                {ele.isEnroll && ele.files !== undefined && (
                  <select>
                    {ele.files.map((file) => (
                      <option value={file} key={file}>
                        {file}
                      </option>
                    ))}
                  </select>
                )}
                {ele.isEnroll && ele.files !== undefined && (
                  <button id={ele.id} onClick={downloadHadler}>
                    Download
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Student;
