
import { useState } from "react";
import axios from "axios";

export const Register = () => {
  return (
    <div>
      register
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
      alert("Registered Successfully!!!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor="firstname">First name:</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={firstname}
          onChange={(event) => setFirstname(event.target.value)}
        />

        <label htmlFor="lastname">Last name:</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make login request
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="usernameL"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="passwordL"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div>
          <button type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
};