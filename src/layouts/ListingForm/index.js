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
import { Typography, FormControl, Select, MenuItem, InputLabel, Radio, RadioGroup, FormControlLabel, FormLabel, FormGroup, Checkbox } from "@mui/material";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
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
import FileUpload from "react-material-file-upload";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import Dashboard from "layouts/dashboard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { ArrowDownward, ArrowDropDown } from "@mui/icons-material";

function Basic() {
    const iconDisplay = {
        '&.MuiSvgIcon-root': {
            display: "block"
        }
    }


    const [value, setValue] = useState(null);
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

        <DashboardLayout>
            <DashboardNavbar />
            <Card sx={{ mx: 2 }}>

                <MDBox pt={4} pb={3} px={3} >
                    <MDBox component="form" role="form">
                        <MDBox mb={2}>
                            {/* <MDInput type="email" label="Email" name="email" onChange={handleChange} fullWidth /> */}
                            <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label">Select Property Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={""}
                                    label="Select Property Type"
                                    onChange={handleChange}
                                    sx={{ py: 1.5 }}
                                    IconComponent={ArrowDropDown}

                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </MDBox>
                        <MDBox mb={2}>
                            <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label">Select Operation</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={""}
                                    label="Select Operation"
                                    onChange={handleChange}
                                    sx={{ py: 1.5 }}
                                    IconComponent={ArrowDropDown}

                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="text" label="Set Location" name="location" onChange={handleChange} fullWidth />
                            {/* {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.password}
                            </Typography>} */}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="text" label="city/town" name="city-town" onChange={handleChange} fullWidth />
                            {/* {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.password}
                            </Typography>} */}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="text" label="Street Name" name="street" onChange={handleChange} fullWidth />
                            {/* {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.password}
                            </Typography>} */}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="text" label="Number" name="stnumber" onChange={handleChange} fullWidth />
                            {/* {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.password}
                            </Typography>} */}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="text" label="Residential Address (optional)" name="address" onChange={handleChange} fullWidth />
                            {/* {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.password}
                            </Typography>} */}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="email" label="Email" name="Email" onChange={handleChange} fullWidth />
                            {/* {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.password}
                            </Typography>} */}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="number" label="Phone" name="phone" onChange={handleChange} fullWidth />
                            {/* {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.password}
                            </Typography>} */}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="text" label="Your Name" name="name" onChange={handleChange} fullWidth />
                            {/* {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.password}
                            </Typography>} */}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="text" label="Select Preferable Contact" name="pContact" onChange={handleChange} fullWidth />
                            {/* {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.password}
                            </Typography>} */}
                        </MDBox>
                        <MDBox mb={2}>
                            <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label">Property Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={10}
                                    label="Property Type"
                                    onChange={handleChange}
                                    sx={{ py: 1.5 }}
                                    IconComponent={ArrowDropDown}

                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="text" label="M2 of house" name="area" onChange={handleChange} fullWidth />
                            {/* {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.password}
                            </Typography>} */}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="number" label="Add no of Beds" name="beds" onChange={handleChange} fullWidth />
                            {/* {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.password}
                            </Typography>} */}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="number" label="Add no of Baths" name="baths" onChange={handleChange} fullWidth />
                            {/* {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.password}
                            </Typography>} */}
                        </MDBox>
                        <MDBox mb={2} >
                            <FormControl sx={{ width: "100%" }}>
                                <FormLabel sx={{ fontSize: "15px" }} id="demo-radio-buttons-group-label">Does the Property has Lift</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                    sx={{ fontSize: "10px", width: "100%" }}
                                >
                                    <Grid container justifyContent="space-evenly" >
                                        <Grid item>

                                            <FormControlLabel xs={6} value="female" control={<Radio />} label="Yes" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel sx={6} value="male" control={<Radio />} label="No" />
                                        </Grid>
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                        </MDBox>
                        <MDBox mb={2} >
                            <FormControl sx={{ width: "100%" }}>
                                <FormLabel sx={{ fontSize: "15px" }} id="demo-radio-buttons-group-label">Smoking Allowed?</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                    sx={{ fontSize: "10px", width: "100%" }}
                                >
                                    <Grid container justifyContent="space-evenly" >
                                        <Grid item>

                                            <FormControlLabel xs={6} value="female" control={<Radio />} label="Yes" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel sx={6} value="male" control={<Radio />} label="No" />
                                        </Grid>
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                        </MDBox>
                        <MDBox mb={2} >
                            <FormControl sx={{ width: "100%" }}>
                                <FormLabel sx={{ fontSize: "15px" }} id="demo-radio-buttons-group-label">Are Couple Allowed to Share Room and Expense</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                    sx={{ fontSize: "10px", width: "100%" }}
                                >
                                    <Grid container justifyContent="space-evenly" >
                                        <Grid item>

                                            <FormControlLabel xs={6} value="female" control={<Radio />} label="Yes" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel sx={6} value="male" control={<Radio />} label="No" />
                                        </Grid>
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                        </MDBox>
                        <MDBox mb={2} >
                            <FormControl sx={{ width: "100%" }}>
                                <FormLabel sx={{ fontSize: "15px" }} id="demo-radio-buttons-group-label">Are Pets Allowed</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                    sx={{ fontSize: "10px", width: "100%" }}
                                >
                                    <Grid container justifyContent="space-evenly" >
                                        <Grid item>

                                            <FormControlLabel xs={6} value="female" control={<Radio />} label="Yes" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel sx={6} value="male" control={<Radio />} label="No" />
                                        </Grid>
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                        </MDBox>
                        <MDBox mb={2} >
                            <FormControl sx={{ width: "100%" }}>
                                <FormLabel sx={{ fontSize: "15px" }} id="demo-radio-buttons-group-label">Are Minors are Allowed (optional) </FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                    sx={{ fontSize: "10px", width: "100%" }}
                                >
                                    <Grid container justifyContent="space-evenly" >
                                        <Grid item>

                                            <FormControlLabel xs={6} value="female" control={<Radio />} label="Yes" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel sx={6} value="male" control={<Radio />} label="No" />
                                        </Grid>
                                    </Grid>
                                </RadioGroup>
                            </FormControl>

                        </MDBox>

                        <MDBox mb={2}>
                            <FormLabel sx={{ fontSize: "15px" }} id="">Room Characteristics </FormLabel>
                            <FormGroup >
                                <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal" } }} control={<Checkbox defaultChecked />} label="Air Condition" />
                                <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal" } }} control={<Checkbox />} label="Lift" />
                            </FormGroup>
                        </MDBox>
                        <MDBox mb={2}>
                            <FormLabel sx={{ fontSize: "15px" }} id="">Features of Building </FormLabel>
                            <FormGroup >
                                <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal" } }} control={<Checkbox defaultChecked />} label="Air Condition" />
                                <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal" } }} control={<Checkbox />} label="Lift" />
                            </FormGroup>
                        </MDBox>
                        <MDBox mb={2}>
                            <FormLabel sx={{ fontSize: "15px" }} id="">Is the property adapted for people with
                                reduced mobilty? </FormLabel>
                            <FormGroup >
                                <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal", width: "90%", marginTop: "20px" } }} control={<Checkbox defaultChecked />} label="The exterior access to the property has
                                     been adapted for wheelchair use (the property has ramps and a lift with a capacity of 6 people or the property is at street level without kerbs)" />
                                <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal" } }} control={<Checkbox />} label="The interior of the property has been
                                        adapted for wheelchair use (it has wide doors and corridors, handrails, non-slip floors,…)" />
                            </FormGroup>
                        </MDBox>
                        <MDBox mb={2}>
                            <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label">Heating Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={""}
                                    label="Heating Type"
                                    onChange={handleChange}
                                    sx={{ py: 1.5 }}
                                    IconComponent={ArrowDropDown}

                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </MDBox>
                        <MDBox mb={2}>
                            <Grid container justifyContent="space-evenly">
                                <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal" } }} control={<Checkbox defaultChecked />} label="1 Person" />
                                <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal" } }} control={<Checkbox />} label="2 Persons" />
                                <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal" } }} control={<Checkbox />} label="3 Persons or More" />
                            </Grid>
                        </MDBox>
                        <MDBox mb={2}>
                            <FormLabel sx={{ fontSize: "15px" }} id="">Other Features of Property </FormLabel>
                            <FormGroup >
                                <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal" } }} control={<Checkbox defaultChecked />} label="Air Condition" />
                                <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal" } }} control={<Checkbox />} label="Lift" />
                            </FormGroup>
                        </MDBox>

                    </MDBox>
                    <MDBox mb={2}>

                        <Typography variant="string" sx={{ fontSize: "15px" }}>Available From </Typography>
                        <MDInput type="password" label="Password" name="password" onChange={handleChange} fullWidth />

                    </MDBox>
                    <MDBox mb={2}>

                        <Typography variant="string" sx={{ fontSize: "15px" }}>About the people currently living in the house </Typography>
                        <MDInput type="password" label="Password" name="password" onChange={handleChange} fullWidth />

                    </MDBox>
                    <MDBox mb={2} >
                        <FormControl sx={{ width: "100%" }}>
                            <FormLabel sx={{ fontSize: "15px" }} id="demo-radio-buttons-group-label">Does Anyone currently Living in the Property?</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                sx={{ fontSize: "10px", width: "100%" }}
                            >
                                <Grid container justifyContent="space-evenly" >
                                    <Grid item>

                                        <FormControlLabel xs={6} value="female" control={<Radio />} label="Yes" />
                                    </Grid>
                                    <Grid item>
                                        <FormControlLabel sx={6} value="male" control={<Radio />} label="No" />
                                    </Grid>
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                    </MDBox>
                    <MDBox mb={2}>

                        <Typography variant="string" sx={{ fontSize: "15px" }}>Gender of person you are looking for</Typography>
                        <MDInput type="password" label="Password" name="password" onChange={handleChange} fullWidth />

                    </MDBox>
                    <MDBox mb={2}>
                        <FormLabel sx={{ fontSize: "15px" }} id="">Occupation </FormLabel>
                        <FormGroup >
                            <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal" } }} control={<Checkbox defaultChecked />} label="Air Condition" />
                            <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal" } }} control={<Checkbox />} label="Lift" />
                        </FormGroup>
                    </MDBox>
                    <MDBox mb={2}>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Minimum Stay</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={10}
                                label="Minimum Stay"
                                onChange={handleChange}
                                sx={{ py: 1.5 }}
                                IconComponent={ArrowDropDown}

                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </MDBox>

                    <MDBox mb={2}>

                        <Typography variant="string" sx={{ fontSize: "15px" }}>Price</Typography>
                        <MDInput type="password" label="Password" name="password" onChange={handleChange} fullWidth />

                    </MDBox>
                    <MDBox mb={2}>

                        <Typography variant="string" sx={{ fontSize: "15px" }}>Community Fees (Optional) </Typography>
                        <MDInput type="password" label="Password" name="password" onChange={handleChange} fullWidth />

                    </MDBox>
                    <MDBox mb={2}>

                        <Typography variant="string" sx={{ fontSize: "15px" }}>Deposit (Optional) </Typography>
                        <MDInput type="password" label="Password" name="password" onChange={handleChange} fullWidth />

                    </MDBox>
                    <MDBox mb={2}>
                        <Typography variant="string" sx={{ fontSize: "15px" }}>Upload Images </Typography>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <MDButton variant="contained" color="info" component="label">
                                Upload
                                <input hidden accept="image/*" multiple type="file" />
                            </MDButton>
                            <IconButton color="secondary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file" />
                                <PhotoCamera />
                            </IconButton>
                        </Stack>
                    </MDBox >
                    {/* <MDBox mb={2}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Basic example"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider> */}
                    {/* </MDBox> */}
                    <MDBox mt={4} mb={1}>
                        <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                            save
                        </MDButton>
                    </MDBox>
                </MDBox>
            </Card>

        </DashboardLayout >
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