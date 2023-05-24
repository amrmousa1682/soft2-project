import React from "react";
import { useRef } from "react";
import loginImg from "./../img/loginImg.png";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = (props) => {
  const emailInput = useRef()
  const passwordInput = useRef();
  const loginHandler = () => {
    props.onLogin({ email: emailInput.current.value, password: passwordInput.current.value });
  };
  return (
    <section className="vh-150">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card">
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src={loginImg} alt="login form" className="img-fluid" />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3"></i>
                        <span className="h1 fw-bold mb-0">FCI</span>
                      </div>
                      <h5 className="fw-normal mb-3 pb-3">
                        Sign into your account
                      </h5>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          ref={emailInput}
                        />
                        <label className="form-label" htmlFor="form2Example17">
                          Email address
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          ref={passwordInput}
                        />
                        <label className="form-label" htmlFor="form2Example27">
                          Password
                        </label>
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="button"
                          onClick={loginHandler}
                        >
                          Login
                        </button>
                      </div>

                      <a className="small text-muted" href="#!">
                        Forgot password?
                      </a>
                      <p className="mb-5 pb-lg-2">
                        Don't have an account? <a href="#!">Register here</a>
                      </p>
                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
