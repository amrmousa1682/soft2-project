import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "./../../img/per5.jpeg";
import img2 from "./../../img/img.jpeg";
import "./Admin.css";
import { useRef } from "react";
import axios from "axios";

const Admin = () => {
  const departmentName = useRef();
  const departmentCode = useRef();
  const subjectName = useRef();
  const subjectCode = useRef();
  const subjecDepartmentCode = useRef();
  const prevSubject = useRef();
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const academicNumber = useRef();
  const doctorEmail = useRef();
  const subjectCodeClass = useRef();
  const subjectCodeStudents = useRef();
  const addDepartmentHandler = () => {
    axios
      .post(
        "http://localhost:5000/admin/department",
        {
          name: departmentName.current.value,
          code: departmentCode.current.value,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      )
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
  const addSubjectHandler = () => {
    axios
      .post(
        "http://localhost:5000/admin/subject",
        {
          name: subjectName.current.value,
          code: subjectCode.current.value,
          departmentCode: subjecDepartmentCode.current.value,
          prerequisiteCode: prevSubject.current.value,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      )
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
  const addDoctorHandler = () => {
    axios
      .post(
        "http://localhost:5000/admin/doctor",
        {
          name: userName.current.value,
          email: email.current.value,
          password: password.current.value,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      )
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
  const addStudentHandler = () => {
    axios
      .post(
        "http://localhost:5000/admin/student",
        {
          name: userName.current.value,
          email: email.current.value,
          password: password.current.value,
          id: academicNumber.current.value,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      )
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
  const addDoctorToClassHandler = () => {
    axios
      .patch(
        "http://localhost:5000/admin/subject",
        {
          doctorEmail: doctorEmail.current.value,
          subjectCode: subjectCodeClass.current.value,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      )
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
  const getStudents = () => {
    axios
      .get(
        `http://localhost:5000/admin/enrollments/${subjectCodeStudents.current.value}`,
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
          responseType: "blob",
        }
      )
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        console.log(res.data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "students.xlsx");
        document.body.appendChild(link);
        link.click();
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
      <div className="adminPage">
        <div>
          <h2> Admin Page</h2>
        </div>
        <div className="dept">
          <div className="container">
            <div className="row">
              <div className="cardd col-md-6">
                <h4> Department </h4>
                <div>
                  <div>
                    <label> Department Name : </label>
                    <input type="text" ref={departmentName} />
                  </div>
                  <div>
                    <label> Department Code : </label>
                    <input type="text" ref={departmentCode} />
                  </div>
                  <div>
                    <button onClick={addDepartmentHandler}>
                      Add Department
                    </button>
                  </div>
                </div>
              </div>
              <div className="cardd col-md-6">
                <img src={img} alt="dept" />
              </div>
            </div>
          </div>
        </div>

        <div className="sub">
          <div className="container">
            <div className="row">
              <div className=" cardd col-md-6">
                <img src={img2} alt="sub" />
              </div>
              <div className=" cardd col-md-6">
                <h4> Subject </h4>
                <div>
                  <div>
                    <label> Subject Name : </label>
                    <input type="text" ref={subjectName} />
                  </div>
                  <div>
                    <label> Subject Code : </label>
                    <input type="text" ref={subjectCode} />
                  </div>
                  <div>
                    <label> Department : </label>
                    <input type="text" ref={subjecDepartmentCode} />
                  </div>
                  <div>
                    <label> Previse Subject : </label>
                    <input type="text" ref={prevSubject} />
                  </div>
                  <div>
                    <button onClick={addSubjectHandler}>Add Subject</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="account">
          <div className="container">
            <h4> Creat New Account </h4>
            <div className="row">
              <div className=" btn cardd  col-md-6 ">
                <button onClick={addDoctorHandler}> Add Doctor </button> <br />
                <button onClick={addStudentHandler}> Add Student </button>
              </div>
              <div className=" cardd col-md-6">
                <label> Name : </label>
                <input type="text" ref={userName} />
                <br />
                <label> email : </label>
                <input type="text" ref={email} />
                <br />
                <label> Password : </label>
                <input type="password" ref={password} />
                <br />
                <label> Academic number : </label>
                <input type="text" ref={academicNumber} />
                <br />
              </div>
            </div>
          </div>
        </div>
        <div className="account">
          <div className="container">
            <h4> Add doctor to class </h4>
            <div className="row">
              <div className=" btn cardd  col-md-6 ">
                <button onClick={addDoctorToClassHandler}>
                  Add Doctor To Class
                </button>
                <br />
              </div>
              <div className=" cardd col-md-6">
                <label> email : </label>
                <input type="text" ref={doctorEmail} />
                <br />
                <label> Subject Code : </label>
                <input type="text" ref={subjectCodeClass} />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="account">
          <div className="container">
            <h4> get students in subject </h4>
            <div className="row">
              <div className=" btn cardd  col-md-6 ">
                <button onClick={getStudents}>
                  get students
                </button>
                <br />
              </div>
              <div className=" cardd col-md-6">
                <label> Subject Code : </label>
                <input type="text" ref={subjectCodeStudents} />
                <br />
              </div>
            </div>
          </div>
        </div>
      <div className="br"></div>
    </div>
  );
};
export default Admin;
