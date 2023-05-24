import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
export const EndFooter = () => {
  const style = {
    backgroundColor: " rgba(0, 0, 0, 0.2)",
  };
  return (
    <div>
      <footer className="bg-light text-center text-lg-start">
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase">Computer scince & information</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                atque ea quis molestias. Fugiat pariatur maxime quis culpa
                corporis vitae repudiandae aliquam voluptatem veniam, est atque
                cumque eum delectus sint!
              </p>
            </div>
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase"> Menofia university</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                atque ea quis molestias. Fugiat pariatur maxime quis culpa
                corporis vitae repudiandae aliquam voluptatem veniam, est atque
                cumque eum delectus sint!
              </p>
            </div>
          </div>
        </div>
        <div className="text-center p-3" style={style}>
          © 2020 Copyright:{" "}
          <a className="text-dark" href="www.google.com">
            FCI.com
          </a>
        </div>
      </footer>
    </div>
  );
};
export default EndFooter;
