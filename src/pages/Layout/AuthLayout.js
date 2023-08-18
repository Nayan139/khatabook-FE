import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Tab, Tabs } from "@mui/material";
import Login from "./Login/Login";
import Logo from "../../assets/logo.jpg";
import Register from "./Register/Register";
import "./AuthLayout.css";

const AuthLayout = () => {
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box className="main">
      <Grid container className="grid-container">
        <Grid item xs={8} className="image-block"></Grid>
        <Grid item xs={4}>
          <Box className="action-container">
            <Box className="logo-block">
              <img src={Logo} alt="logo" className="logo" />
            </Box>
            <Box >
              <Box sx={{ width: "100%" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="primary"
                  indicatorColor="primary"
                  aria-label="primary tabs example"
                >
                  <Tab value="one" label="LOGIN" ></Tab>
                  <Tab value="two" label="REGISTER" />
                </Tabs>
              </Box>
            </Box>
            {value === "one" ? <Login value={value} /> :<Register  value={value} />}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthLayout;
