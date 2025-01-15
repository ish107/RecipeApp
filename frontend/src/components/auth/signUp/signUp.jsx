import { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Paper,} from "@mui/material";

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
        alert("Registered Successfully!");
        setUsername("");
        setFirstname("");
        setLastname("");
        setPassword("");
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, backgroundColor: "#FFFFFF" }}>
        <form onSubmit={submit}>
          <Typography variant="h5" component="h2" gutterBottom color="#3B2A2A">
            Sign Up
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: "#3B2A2A", color: "#FFFFFF" }}>
            Sign Up
          </Button>
        </form>
      </Paper>
    );
  };

  export default SignUp;