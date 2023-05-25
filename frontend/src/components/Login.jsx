import React from "react";
import "./Login.css";
import googleImg from "../assets/google.png";
import { redirect } from "react-router-dom";

const Login = ({ REACT_APP_API_URL }) => {

  const googleAuth = () => {
		window.open(
			`${REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
  };

  return (
    <div className="container">
      <h1 className="heading">Sign in</h1>
      <div className="card">
        <button className="google-btn" onClick={googleAuth}>
          <img className="google-img" src={googleImg} alt="google icon" />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
