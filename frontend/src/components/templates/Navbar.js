import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Canteen Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Button color="inherit" onClick={() => navigate("/users")}>
            Users
          </Button> */}
          {/* <Button color="inherit" onClick={() => navigate("/register")}>
            Register
          </Button> */}
          {
            localStorage.getItem("user_type") === "buyer"  ?

              <Box>
                <Button color="inherit" onClick={() => navigate("/dashboard")}>
                  Dashboard
                </Button>
                <Button color="inherit" onClick={() => navigate("/myorders")}>
                  My Orders
                </Button>
                <Button color="inherit" onClick={() => navigate("/profile")}>
                  My Profile
                </Button>
                <Button color="inherit" onClick={() => navigate("/wallet")}>
                  Wallet
                </Button>
                <Button color="inherit" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </Box>
              : localStorage.getItem("user_type") === "vendor" ?
              <Box>
                <Button color="inherit" onClick={() => navigate("/menu")}>
                  Menu
                </Button>
                <Button color="inherit" onClick={() => navigate("/order")}>
                  Orders
                </Button>
                <Button color="inherit" onClick={() => navigate("/statistics")}>
                  Statistics
                </Button>
                <Button color="inherit" onClick={() => navigate("/profile")}>
                  My Profile
                </Button>
                <Button color="inherit" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </Box>
              :
              <Box>
                <Button color="inherit" onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
                <Button color="inherit" onClick={() => navigate("/signin")}>
                  Sign In
                </Button>
              </Box>

          }
          {/* <Button color="inherit" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
          <Button color="inherit" onClick={() => navigate("/signin")}>
            Sign In
          </Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            My Profile
          </Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
