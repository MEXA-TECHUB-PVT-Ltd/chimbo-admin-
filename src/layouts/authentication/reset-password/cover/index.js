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
/*eslint-disable*/
// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import { useFormik } from "formik";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";
import { useState } from "react";
import { userVerifyEmail } from "validations/Uservalidation";
import { Typography } from "@mui/material";
import { getByEmail } from "api";
import { useNavigate } from "react-router-dom";


function Cover() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const initialValues = {

    email: "",

  }
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: userVerifyEmail,
    onSubmit: async (values) => {
      try {
        localStorage.removeItem("adminId");
        const { data } = await getByEmail(values);
        console.log(data);
        localStorage.setItem("adminId", data.admin._id);
        if (data.status == 200) {
          navigate("/otp")
        }
      }
      catch (e) {
        console.log(e);
        setError(e.response.data.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    }
  })

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Forgot Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            You will receive an e-mail in maximum 60 seconds
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <MDInput type="email" label="Email" variant="standard" name="email" value={values.email} onChange={handleChange} fullWidth />
              {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                {errors.email}
              </Typography>}
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                submit
              </MDButton>
              {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px", textAlign: "center" }} my={1}>
                {error}
              </Typography>}
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
