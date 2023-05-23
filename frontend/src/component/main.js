import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Navs from "./nav";
import Login from "./login";
import Footer from "./footer";
import Student from "./users/Stud";
import Admin from "./users/Admin";
import Doctor from "./users/Doc";
import EndFooter from "./endFooter";

const Main = () => {
  const [role, setRole] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      const user = jwtDecode(token);
      if (user.role === "admin") {
        setRole("admin");
      } else if (user.role === "doctor") {
        setRole("doctor");
      } else {
        setRole("student");
      }
    }
  }, []);
  const loginHandler = (fileds) => {
    const { email, password } = fileds;
    axios
      .post("http://localhost:5000/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        const token = res.data.Authorization;
        const user = jwtDecode(token);
        localStorage.setItem("Authorization", token);
        if (user.role === "admin") {
          setRole("admin");
        } else if (user.role === "doctor") {
          setRole("doctor");
        } else {
          setRole("student");
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  let content,
    login = false;
  if (role === "admin") {
    content = <Admin />;
  } else if (role === "doctor") {
    content = <Doctor />;
  } else if (role === "student") {
    content = <Student />;
  } else {
    login = true;
    content = <Login onLogin={loginHandler} />;
  }
  return (
    <>
      <Navs login={login} />
      {content}
      <Footer />
      <EndFooter />
    </>
  );
};

export default Main;
