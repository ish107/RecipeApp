import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";

import axiosInstance from "../../../util/axios";
import { setUser } from "../../../store/userSlice";

import { TextField, Button, Typography, Paper,CircularProgress} from "@mui/material";


const LogIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [_, setCookies] = useCookies(["access_token"]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const onSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      try {
        const response = await axiosInstance.post("/user/login", {
          username,
          password,
        });
        console.log(response.data, 'data ')
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        dispatch(setUser({
          user: {
            id: response.data.userID,
            username: response.data.username,
            favorites: response.data.favorites,
            ratingsGiven: response.data.ratingsGiven,
          },
          token: response.data.token,
        }));
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, backgroundColor: "#FFFFFF" }}>
        <form onSubmit={onSubmit}>
          <Typography variant="h5" component="h2" gutterBottom color="#3B2A2A">
            Log In
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
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: "#3B2A2A", color: "#FFFFFF" }}>
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Log In"}
          </Button>
        </form>
      </Paper>
    );
  };

export default LogIn;