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

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import { changePassword } from "api";
import { enternewPassword } from "validations/Uservalidation";
import { Typography } from "@mui/material";

function Cover() {

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const adminId = localStorage.getItem("adminId")
  const initialValues = {

    newPassword: "",
    adminId: adminId

  }
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: enternewPassword,
    onSubmit: async (values) => {
      try {
        const { data } = await changePassword(values);
        console.log(data);

        if (data.status == 200) {
          alert("Password changed Successfully")
          localStorage.removeItem("adminId")
          navigate("/authentication/sign-in")

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
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            Enter New Password
          </MDTypography>

        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <MDInput type="text" label="New Password" onChange={handleChange} variant="standard" name="newPassword" value={values.newPassword} fullWidth />
              {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                {errors.newPassword}
              </Typography>}
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                submit
              </MDButton>
              {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
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
