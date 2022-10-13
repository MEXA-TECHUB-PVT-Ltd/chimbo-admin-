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
import { useEffect, useState } from "react";
import { updateHeatingType } from "api";
import { getHeatingType } from "api";
import swal from 'sweetalert';
function Cover() {
    let { heatingTypeId } = useParams();
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
                if (heatingTypeId === "null") {
                    const { data } = await addHeatingType(values);
                    console.log(data);
                    if (data.status == 200) {
                        await swal("Added!", `Heating Type ${data.heatingType.name} has been Added!`, "success");
                        navigate("/heatingTypes")
                    }
                }
                else {
                    values.id = heatingTypeId;
                    const { data } = await updateHeatingType(values);
                    if (data.status == 200) {
                        await swal("Updated!", `Heating Type has been Updated to  ${values.name}`, "success");
                        navigate("/heatingTypes")
                    }
                }
            }
            catch (e) {
                console.log(e.response.data);
                alert(e.response.data.message)
            }
        }
    })


    console.log(errors);
    // console.log(values);
    useEffect(() => {
        if (heatingTypeId !== "null") {
            console.log(heatingTypeId);
            async function chk() {
                try {

                    const { data } = await getHeatingType(heatingTypeId)
                    const { heatingType } = data;
                    initialValues.name = heatingType.name;
                    console.log(heatingType.name);
                    setName(heatingType.name)
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

                <MDBox pt={4} pb={3} px={3} mt={2}>
                    <MDBox component="form" role="form" onSubmit={handleSubmit}>
                        <MDBox mb={2}>
                            <MDInput type="text" label="Name" variant="standard" name="name" value={values.name} onChange={handleChange} fullWidth />
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.name}
                            </Typography>}
                        </MDBox>

                        <MDBox mt={4} mb={1} sx={{ textAlign: "end" }}>
                            <MDButton variant="gradient" color="info" small="true" onClick={handleSubmit}>
                                {heatingTypeId === "null" ? "Add" : "Update"}
                            </MDButton>
                        </MDBox>

                    </MDBox>
                </MDBox>
            </Card>

        </DashboardLayout>
    );
}

export default Cover;
