
import { useState } from "react";
import axios from "axios";
import "../styles/register.css";
import {useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";

export const Register = () => {
  return (
    <div className="register-form">
      <LogIn />
      <SignUp />
    </div>
  );
};

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        firstname,
        lastname,
        password,
      });
      alert("Registered Successfully!!!"); //signing up

      setUsername("");
      setFirstname("");   //reset fields
      setLastname("");
      setPassword("");


    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reg-form">
      <form onSubmit={submit} className="signup">
        <div className="form-detais">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)} //can written as seperate function
          />
        </div>
        <div className="form-detais">
          <label htmlFor="firstname">First name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
          />

        </div>
        <div className="form-detais">
          <label htmlFor="lastname">Last name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
          />
        </div>
        <div className="form-detais">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        
        <div className="btn">
          <button className="btn-reg" type="submit">Sign Up</button>
        </div> 
      </form>
    </div>
  );
};

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_,setCookies] = useCookies(["access_token"]) //use cookies to get login credentials

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login",{
        username,
        password,
      });

      setCookies("access_token",response.data.token);
      window.localStorage.setItem("userID",response.data.userID); //set userid and relevent data in browser's local storage
      navigate("/");//redirect to home page
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reg-form">
      <form onSubmit={onSubmit} className="login">
        <div className="form-detais">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="usernameL"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-detais"> 
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="passwordL"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        

        <div className="btn">
          <button type="submit" className="btn-reg">Log In</button>
        </div>
      </form>
    </div>
  );
};