import { Backdrop, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EnhancedBackdrop = ({ isAuthenticated ,onClick}) => {
  

  return (
    <Backdrop
      sx={(theme) => ({
        color: "#fff",
        zIndex: theme.zIndex.drawer + 1,
        backdropFilter: "blur(1px)", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
        textAlign: "center",
        position: 'absolute',
        top:'155px',
      })}
      open={!isAuthenticated}
     // onclick={handleRedirectToLogin}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        You need to log in to create recipes
      </Typography>
      <Button
        variant="contained"
        color="black"
        onClick={onClick}
        sx={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "30px",
          backgroundColor: "#3CB371",
          '&:hover': {
            backgroundColor: "#2F4F4F", 
          },
        }}
      >
        Go to Login
      </Button>
    </Backdrop>
  );
};

export default EnhancedBackdrop;
