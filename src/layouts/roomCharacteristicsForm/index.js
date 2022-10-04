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
import Dashboard from "layouts/dashboard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { addHeatingType } from "api";
import { nameType } from "validations/Uservalidation";
import { addRoomCharacteristic } from "api";
import { useState, useEffect } from "react";
import { getRoomCharacteristics } from "api";
import { updateRoomCharacteristic } from "api";

function Cover() {
    let { roomCharacteristicId } = useParams();
    const [name, setName] = useState("")
    const navigate = useNavigate();
    const initialValues = {
        name: "",

    }

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: nameType,
        onSubmit: async (values) => {
            try {
                if (roomCharacteristicId === "null") {
                    const { data } = await addRoomCharacteristic(values);
                    console.log(data);
                    if (data.status == 200) {
                        alert("Room Characteristic Added Successfully")
                        navigate("/roomCha")
                    }
                }
                else {
                    values.id = roomCharacteristicId;
                    const { data } = await updateRoomCharacteristic(values);
                    if (data.status == 200) {
                        alert("Room Characteristic Updated Successfully")
                        navigate("/roomCha")
                    }
                }

            }
            catch (e) {
                console.log(e.response.data);
            }
        }
    })
    console.log(errors);
    // console.log(values);
    useEffect(() => {
        if (roomCharacteristicId !== "null") {
            // console.log(heatingTypeId);
            async function chk() {
                try {

                    const { data } = await getRoomCharacteristics(roomCharacteristicId)
                    const { roomCharacteristic } = data;
                    initialValues.name = roomCharacteristic.name;
                    console.log(roomCharacteristic.name);
                    setName(roomCharacteristic.name)
                }
                catch (e) {
                    console.log(e);
                }


            }
            chk();
        }

    }, [])



    return (
        <DashboardLayout>
            <DashboardNavbar />

            <Card>
                {/* <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="success"
                    mx={3}
                    mt={-11}
                    p={3}
                    mb={0}
                    textAlign="center"
                >

                    <MDTypography display="block" variant="button" color="white" my={2}>
                        Enter your email and password to register
                    </MDTypography>
                </MDBox> */}
                <MDBox pt={4} pb={3} px={3} mt={2}>
                    <MDBox component="form" role="form" onSubmit={handleSubmit}>
                        <MDBox mb={2}>
                            <MDInput type="text" label="Name" variant="standard" name="name" value={values.name} onChange={handleChange} fullWidth />
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.name}
                            </Typography>}
                        </MDBox>
                        {/* <MDBox mb={2}>
                            <MDInput type="email" label="Email" variant="standard" name="email" value={values.email} onChange={handleChange} fullWidth />
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.email}
                            </Typography>}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="password" label="Password" variant="standard" name="password" value={values.password} onChange={handleChange} fullWidth />
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.password}
                            </Typography>}
                        </MDBox> */}
                        {/* <MDBox display="flex" alignItems="center" ml={-1}>
                            <Checkbox />
                            <MDTypography
                                variant="button"
                                fontWeight="regular"
                                color="text"
                                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                            >
                                &nbsp;&nbsp;I agree the&nbsp;
                            </MDTypography>
                            <MDTypography
                                component="a"
                                href="#"
                                variant="button"
                                fontWeight="bold"
                                color="info"
                                textGradient
                            >
                                Terms and Conditions
                            </MDTypography>
                        </MDBox> */}
                        <MDBox mt={4} mb={1} sx={{ textAlign: "end" }}>
                            <MDButton variant="gradient" color="info" small="true" onClick={handleSubmit}>
                                Add
                            </MDButton>
                        </MDBox>
                        {/* <MDBox mt={3} mb={1} textAlign="center">
                            <MDTypography variant="button" color="text">
                                Already have an account?{" "}
                                <MDTypography
                                    component={Link}
                                    to="/authentication/sign-in"
                                    variant="button"
                                    color="info"
                                    fontWeight="medium"
                                    textGradient
                                >
                                    Sign In
                                </MDTypography>
                            </MDTypography>
                        </MDBox> */}
                    </MDBox>
                </MDBox>
            </Card>

        </DashboardLayout>
    );
}

export default Cover;
