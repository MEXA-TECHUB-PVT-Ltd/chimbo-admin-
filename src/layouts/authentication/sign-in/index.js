/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
/* eslint-disable */
import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import { Typography } from "@mui/material";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useFormik } from "formik";
import { authFormLogin } from "api";
import { useNavigate } from "react-router-dom";
import { adminLoginSchema } from "validations/Uservalidation";
import AdminRoutesAuth from "AdminRoutesAuth";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",

  }

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: adminLoginSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await authFormLogin(values)
        console.log(data);
        if (data.status == 200) {
          localStorage.setItem("AdminCredentials", JSON.stringify(data))
          navigate("/dashboard")
        }
      }
      catch (e) {
        console.log(e.response.data);
        setError(e.response.data.message);
      }
    }
  })
  return (


    < BasicLayout image={bgImage} >
      <Card>

        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" name="email" onChange={handleChange} fullWidth />
              {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                {errors.email}
              </Typography>}
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" name="password" onChange={handleChange} fullWidth />
              {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                {errors.password}
              </Typography>}
            </MDBox>
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography
              component={Link}
              to="/forgotPassword"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
              sx={{
                textAlign: "center"
              }}
            >
              Forgot Password?
            </MDTypography>
          </MDBox>
          {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px", textAlign: "center" }} my={1}>
            {error}
          </Typography>}

        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;











{/* <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >

          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
{/* </MDBox> */ }