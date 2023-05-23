import React from "react";
import "./nav.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import logo from "./../img/logo.jpeg";
const Navs = (props) => {
  const logoutHandler = () => {
    localStorage.removeItem("Authorization");
    window.location.reload(false);
  };
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#">
          <img src={logo} title="logo" className="logo" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">About Us</Nav.Link>
            <Nav.Link href="#link">Courses</Nav.Link>
            <Nav.Link href="#link">Contact us</Nav.Link>
            <Nav.Link href="#link">Resources</Nav.Link>
            {!props.login&&<button onClick={logoutHandler}>logout</button>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navs;
