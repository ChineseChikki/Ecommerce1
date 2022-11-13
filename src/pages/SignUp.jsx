import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, resetPassword] = useState("");
  const navigate = useNavigate();

  const postSignUpDetails = () => {
    fetch("http://localhost:4000/api/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        username,
        password,
        repeatPassword,
        tel,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error_message) {
          alert(data.error_message);
        } else {
          alert(data.message);
          navigate("/login");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //👇🏻 Call it within the submit function
    postSignUpDetails();
    setEmail("");
    setTel("");
    setUsername("");
    setPassword("");
    resetPassword("");
  };
  const gotoLoginPage = () => navigate("/login");

  return (
    <div className="signUp__container">
      <h2>Sign up </h2>
      <form className="signUp__form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="tel">Phone Number</label>
        <input
          type="tel"
          name="tel"
          id="tel"
          value={tel}
          required
          onChange={(e) => setTel(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          // minLength={8}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="repeatPassword">repeatPassword</label>
        <input
          type="password"
          name="repeatPassword"
          id="repeatPassword"
          // minLength={8}
          required
          value={repeatPassword}
          onChange={(e) => resetPassword(e.target.value)}
        />
        <button className="signUpBtn">SIGN UP</button>
        <p>
          Already have an account?{" "}
          <span className="link" onClick={gotoLoginPage}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
