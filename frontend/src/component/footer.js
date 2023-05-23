import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import ph1 from "./../img/per1.jpeg";
import ph2 from "./../img/per2.jpeg";
import ph3 from "./../img/per3.jpeg";
import ph4 from "./../img/per4.jpeg";
import ph5 from "./../img/per5.jpeg";
import ph6 from "./../img/per6.jpeg";
import "./footer.css";

const Footer = () => {
  return (
    <section className="slid">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2> Team </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Carousel slide={false}>
              <Carousel.Item>
                <img src={ph1} alt="" />
                <Carousel.Caption>
                  <span>
                    <h3>Amira Elshoura </h3>
                  </span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    <br />
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={ph2} alt="" />
                <Carousel.Caption>
                  <span>
                    <h3>Ashraf Maged</h3>
                  </span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    <br />
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={ph3} alt="" />
                <Carousel.Caption>
                  <span>
                    <h3>Amr Mousa</h3>
                  </span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    <br />
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={ph4} alt="" />
                <Carousel.Caption>
                  <span>
                    <h3>Esraa Ata</h3>
                  </span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    <br />
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={ph5} alt="" />
                <Carousel.Caption>
                  <span>
                    <h3>Amr Elbayoumy</h3>
                  </span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    <br />
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={ph6} alt="" />
                <Carousel.Caption>
                  <span>
                    <h3>Asmaa Nahad</h3>
                  </span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    <br />
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Footer;
