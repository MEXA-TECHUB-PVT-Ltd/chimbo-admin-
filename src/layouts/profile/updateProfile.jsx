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

// react-router-dom components
/*eslint-disable*/
import { Link, useParams } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

import { Typography } from "@mui/material";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useFormik } from "formik";
// Authentication layout components
import { useNavigate } from "react-router-dom";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { authFormSignup } from "api";
import { adminSignUpSchema } from "validations/Uservalidation";
// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import Stack from "@mui/material/Stack";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useState } from "react";
import { upload } from "@testing-library/user-event/dist/upload";
import { uploadAdminProfilePic } from "api";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect } from "react";
import { getAdminByID } from "api";
import { updateAdminProfile } from "api";
import { adminUpdateSchema } from "validations/Uservalidation";

function UpdateProfile() {
  const [adminData, setAdminData] = useState();
  const { adminId } = useParams();
  const [image, setImage] = useState([]);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    id: "",
    pfp: "",
    phoneNo: "",
  };

  useEffect(() => {
    // window.location.reload(false);

    async function chk1() {
      try {
        const { data } = await getAdminByID(adminId);
        console.log(data);
        const record = data?.admin;
        initialValues.name = record?.name;
        initialValues.email = record?.email;
        initialValues.phoneNo = record?.phoneNo;
        initialValues.id = record._id;
        setAdminData(data?.admin);
      } catch (e) {
        console.log(e);
      }
    }
    chk1();
  }, []);

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: adminUpdateSchema,
    onSubmit: async (values) => {
      try {
        let formData = new FormData();
        console.log(image);
        if (image.length > 0) {
          formData.append("profile-photo", image[0]);
          console.log(formData);
          const { data: imagePathData } = await uploadAdminProfilePic(formData);
          console.log(imagePathData.pfp);
          values.pfp = imagePathData.pfp;
        }

        const { data } = await updateAdminProfile(values);
        console.log(data);
        if (data.status == 200) {
          alert(data.message);
          navigate("/profile");
        }
      } catch (e) {
        console.log(e);
        setError(e?.response?.data?.message);
      }
    },
  });
  console.log(errors);
  console.log(values);
  console.log(image);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={3}
          mt={5}
          p={3}
          mb={0}
          textAlign="center"
        >
          <MDTypography display="block" variant="button" color="white" my={2}>
            Update your crendetials
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                variant="standard"
                name="name"
                value={values.name}
                onChange={handleChange}
                fullWidth
              />
              {
                <Typography
                  display="block"
                  variant="string"
                  color="red"
                  sx={{ fontSize: "12px" }}
                  my={1}
                >
                  {errors.name}
                </Typography>
              }
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="number"
                label="Phone No"
                variant="standard"
                name="phoneNo"
                value={values.phoneNo}
                onChange={handleChange}
                fullWidth
              />
              {
                <Typography
                  display="block"
                  variant="string"
                  color="red"
                  sx={{ fontSize: "12px" }}
                  my={1}
                >
                  {errors.phoneNo}
                </Typography>
              }
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                name="email"
                value={values.email}
                onChange={handleChange}
                fullWidth
              />
              {
                <Typography
                  display="block"
                  variant="string"
                  color="red"
                  sx={{ fontSize: "12px" }}
                  my={1}
                >
                  {errors.email}
                </Typography>
              }
            </MDBox>

            <MDBox mb={2}>
              <Typography variant="string" sx={{ fontSize: "15px" }}>
                Upload Profile Image{" "}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2} mt={2}>
                <MDButton variant="contained" color="info" component="label">
                  Upload
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={(event) => {
                      try {
                        const files = event.target.files;
                        console.log(files);
                        let myFiles = Array.from(files);
                        // console.log(myFiles);
                        // const data = myFiles.map((item) => item.name)
                        setImage(myFiles);
                      } catch (e) {
                        console.log(e);
                      }
                      // setFieldValue("imagePaths", data);
                      // setImages(myFiles);
                    }}
                  />
                  <PhotoCamera />
                </MDButton>
              </Stack>

              {image.map((item, index) => (
                <Typography key={index}>{item.name}</Typography>
              ))}

              {
                <Typography
                  display="block"
                  variant="string"
                  color="red"
                  sx={{ fontSize: "12px" }}
                  my={1}
                >
                  {errors.pfp}
                </Typography>
              }
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                update
              </MDButton>
              {
                <Typography
                  display="block"
                  variant="string"
                  color="red"
                  sx={{ fontSize: "12px" }}
                  my={1}
                >
                  {error}
                </Typography>
              }
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default UpdateProfile;
