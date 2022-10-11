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
import { useEffect, useState } from "react";

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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
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
import { getAllPropertyTypes } from "api";
import { listingForm } from "validations/Uservalidation";
import { getIDs } from "api";
import GoogleMaps from "../../GoogleMaps"
import { object } from "prop-types";
import { addListing } from "api";
import { uploadImagesAndVideos } from "api";
function Basic() {
    const iconDisplay = {
        '&.MuiSvgIcon-root': {
            display: "block"
        }
    }
    const Identity = "62e2485a95073225804a82f9"

    // const [data1, setData] = useState([])
    const [propertyType, setPropertyType] = useState([]);
    const [listingType, setListingType] = useState([]);
    const [specification, setSpecification] = useState([]);
    const [RoomCharacteristics, setRoomCha] = useState([])
    const [listingFeatures, setListingFeatures] = useState([]);
    const [heatingType, setHeatingType] = useState([]);
    const [occupationType, setOccupationType] = useState([]);
    const [floorType, setFloorType] = useState([]);
    const [gender, setGender] = useState([]);
    const [value, setValue] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [accessibilityItem, setAItem] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [images, setImages] = useState([]);
    const handleSetRememberMe = () => setRememberMe(!rememberMe);
    const navigate = useNavigate();

    const adminDetails = JSON.parse(localStorage.getItem("AdminCredentials"));
    // console.log(admin;
    // const { id } = admin;
    const { admin } = adminDetails;
    const { id } = admin;

    const initialValues = {

        propertyTypeId: "",
        listingTypeId: "",
        selectedSpecifications: "",
        genderPreferenceId: "",
        city: "",
        streetName: "",
        streetNo: "",
        price: "",
        heatingTypeId: "",
        availableFrom: "",
        roomSharedWith: "",
        currentResidentCount: "",
        isOwnerLivingInProperty: "",
        occupationTypeId: "",
        minStay: "",
        communityFee: "",
        deposit: "",
        imagePaths: [],
        selectedRoomCharacteristics: "",
        selectedFeatures: "",
        selectedAccessibilityItems: "",
        rAddress: "",
        m2: "",
        baths: "",
        beds: "",
        location: {
            type: "Point",
            coordinates: []
        },
        phone: "",
        email: "",
        yourName: "",
        advertiser: "",
        addedBy: "admin",
        floor: ""









    }

    const { values, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: listingForm,
        onSubmit: async (values) => {
            try {

                let formData = new FormData();
                console.log(images);
                images.map((item, index) => {

                    formData.append("listing-images", item)
                })
                console.log(formData);


                const { data } = await uploadImagesAndVideos(formData)
                console.log(data.images);
                values.imagePaths = data.images
                values.advertiser = id
                const { data: listingResp } = await addListing(values)
                if (listingResp.status == 200) {
                    alert("listing Added Successfully")
                    navigate("/listing")
                }
            }
            catch (e) {
                console.log(e.response.data);
                setError(e.response.data.message);
            }
        }
    })
    console.log(errors);
    console.log(values);

    // const handlePropertyChange = (e) => {
    //     setProperty(e.target.value)
    // }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1200,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 1,
    };
    function getLocation(lat, long) {
        values.location.coordinates[0] = long
        values.location.coordinates[1] = lat
        // handleClose();
        console.log(long);
        console.log(lat);
    }

    useEffect(() => {
        async function get() {
            try {
                const { data } = await getIDs();
                if (data.status === 200) {
                    // console.log(resp);
                    const { IDs } = data;
                    console.log(IDs);
                    setPropertyType(IDs.propertyTypeIDs);
                    setListingType(IDs.listingTypeIDs);
                    setSpecification(IDs.specificationIDs);
                    setRoomCha(IDs.roomCharacteristicsIDs);
                    setListingFeatures(IDs.featuresIDs);
                    setHeatingType(IDs.heatingTypeIDs);
                    setGender(IDs.genderIDs);
                    setOccupationType(IDs.occupationTypeIDs);
                    setAItem(IDs.accessibilityItemIDs);
                    setFloorType(IDs.floorIDs);
                }

            }
            catch (e) {
                // console.log(e.response.data.message);
                console.log(e);
                // alert(e.response.data.message)
                setPropertyType([])
                setListingType([])
                setSpecification([]);
                setRoomCha([]);
                setListingFeatures([]);
                setHeatingType([]);
                setGender([]);
                setOccupationType([]);
                setAItem([]);
            }
        }
        get();
    }, [])
    // console.log(data1);





    console.log(floorType);

    console.log(images);






    return (

        <DashboardLayout>
            <DashboardNavbar />
            <Card sx={{ mx: 2 }}>

                <MDBox pt={4} pb={3} px={3} >
                    <MDBox component="form" role="form">
                        <MDBox mb={2}>
                            {/* <MDInput type="email" label="Email" name="email" onChange={handleChange} fullWidth /> */}
                            <FormControl fullWidth InputLabelProps={{ shrink: false }}>
                                <InputLabel id="demo-simple-select-label">Select Property Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={values.propertyTypeId}
                                    label="Select Property Type"
                                    onChange={handleChange}
                                    name="propertyTypeId"
                                    sx={{ py: 1.5, '& .MuiSelect-icon': { display: "block", fontSize: "20px  !important" } }}


                                >

                                    {propertyType?.map((value) =>

                                        <MenuItem key={value._id} value={value._id}>{value.name}</MenuItem>
                                    )}

                                </Select>

                            </FormControl>
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.propertyTypeId}
                            </Typography>}
                        </MDBox>
                        <MDBox mb={2}>
                            <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label" >Select Opertation</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={values.listingTypeId}
                                    label="Select Opertation"
                                    onChange={handleChange}
                                    name="listingTypeId"
                                    sx={{ py: 1.5, '& .MuiSelect-icon': { display: "block", fontSize: "20px  !important" }, "& .MuiOutlinedInput-notchedOutline legend": { display: "none", } }}


                                >
                                    {listingType?.map((value) =>

                                        <MenuItem key={value._id} value={value._id}>{value.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.listingTypeId}
                            </Typography>}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="text" value={values.location.coordinates} name="location" sx={{ "& .MuiOutlinedInput-notchedOutline legend": { display: "none", } }} onClick={handleOpen} placeholder="Set Location" fullWidth />
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <GoogleMaps loc={getLocation} />
                                    {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Text in a modal
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                    // </Typography> */}
                                </Box>
                            </Modal>
                            {/* {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.password}
                            </Typography>} */}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="text" label="city/town" name="city" onChange={handleChange} fullWidth />
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.city}
                            </Typography>}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="text" label="Street Name" name="streetName" onChange={handleChange} fullWidth />
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.streetName}
                            </Typography>}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="text" label="Number" name="streetNo" onChange={handleChange} fullWidth />
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.streetNo}
                            </Typography>}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="text" label="Residential Address (optional)" name="rAddress" onChange={handleChange} fullWidth />
                            {/* {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.password}
                            </Typography>} */}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="email" label="Email" name="email" onChange={handleChange} fullWidth />
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.email}
                            </Typography>}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="number" label="Phone" name="phone" onChange={handleChange} fullWidth />
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.phone}
                            </Typography>}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="text" label="Your Name" name="yourName" onChange={handleChange} fullWidth />
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.yourName}
                            </Typography>}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="text" label="Select Preferable Contact" name="pContact" onChange={handleChange} fullWidth />
                            {/* {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.password}
                            </Typography>} */}
                        </MDBox>
                        {/* <MDBox mb={2}>
                            <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label">Property Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={10}
                                    label="Property Type"
                                    onChange={handleChange}
                                    sx={{ py: 1.5, '& .MuiSelect-icon': { display: "block", fontSize: "20px  !important" } }}


                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </MDBox> */}
                        <MDBox mb={2}>
                            <MDInput type="number" label="M2 of house" name="m2" onChange={handleChange} fullWidth />
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.m2}
                            </Typography>}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="number" label="Add no of Beds" name="beds" onChange={handleChange} fullWidth />
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.beds}
                            </Typography>}
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="number" label="Add no of Baths" name="baths" onChange={handleChange} fullWidth />
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.baths}
                            </Typography>}
                        </MDBox>

                        <MDBox mb={2}>
                            <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label" >Select Floor Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={values.floor}
                                    label="Select Floor Type"
                                    onChange={handleChange}
                                    name="floor"
                                    sx={{ py: 1.5, '& .MuiSelect-icon': { display: "block", fontSize: "20px  !important" }, "& .MuiOutlinedInput-notchedOutline legend": { display: "none", } }}


                                >
                                    {floorType?.map((value) =>

                                        <MenuItem key={value._id} value={value._id}>{value.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.floor}
                            </Typography>}
                        </MDBox>
                        <MDBox mb={2} >
                            <FormControl sx={{ width: "100%" }}>
                                <FormLabel sx={{ fontSize: "15px" }} id="demo-radio-buttons-group-label">Does the Property has Lift</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="62e2485a95073225804a82f9"
                                    // value={values.selectedSpecifications}
                                    name="selectedSpecifications[0].id"
                                    sx={{ fontSize: "10px", width: "100%" }}
                                    onChange={handleChange}
                                >
                                    <Grid container justifyContent="space-evenly" >
                                        <Grid item>

                                            <FormControlLabel xs={6} value={specification[0]?._id} control={<Radio />} label="Yes" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel xs={6} value={Identity} control={<Radio />} label="No" />
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
                                    defaultValue={Identity}
                                    // value={values.selectedSpecifications}
                                    name="selectedSpecifications[1].id"
                                    sx={{ fontSize: "10px", width: "100%" }}
                                    onChange={handleChange}
                                >
                                    <Grid container justifyContent="space-evenly" >
                                        <Grid item>

                                            <FormControlLabel xs={6} value={specification[1]?._id} control={<Radio />} label="Yes" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel xs={6} value={Identity} control={<Radio />} label="No" />
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
                                    defaultValue={Identity}
                                    // value={values.selectedSpecifications}
                                    name="selectedSpecifications[2].id"
                                    sx={{ fontSize: "10px", width: "100%" }}
                                    onChange={handleChange}
                                >
                                    <Grid container justifyContent="space-evenly" >
                                        <Grid item>

                                            <FormControlLabel xs={6} value={specification[2]?._id} control={<Radio />} label="Yes" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel xs={6} value={Identity} control={<Radio />} label="No" />
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
                                    defaultValue={Identity}
                                    // value={values.selectedSpecifications}
                                    name="selectedSpecifications[3].id"
                                    sx={{ fontSize: "10px", width: "100%" }}
                                    onChange={handleChange}
                                >
                                    <Grid container justifyContent="space-evenly" >
                                        <Grid item>

                                            <FormControlLabel xs={6} value={specification[3]?._id} control={<Radio />} label="Yes" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel xs={6} value={Identity} control={<Radio />} label="No" />
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
                                    defaultValue={Identity}
                                    // value={values.selectedSpecifications}
                                    name="selectedSpecifications[4].id"
                                    sx={{ fontSize: "10px", width: "100%" }}
                                    onChange={handleChange}
                                >
                                    <Grid container justifyContent="space-evenly" >
                                        <Grid item>

                                            <FormControlLabel xs={6} value={specification[4]?._id} control={<Radio />} label="Yes" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel xs={6} value={Identity} control={<Radio />} label="No" />
                                        </Grid>
                                    </Grid>
                                </RadioGroup>
                            </FormControl>

                        </MDBox>

                        <MDBox mb={2}>
                            <FormLabel sx={{ fontSize: "15px" }} id="">Room Characteristics </FormLabel>
                            <FormGroup >
                                {
                                    RoomCharacteristics.map((item, index) =>
                                        <FormControlLabel key={item._id} sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal" } }} value={item._id} control={<Checkbox name={`selectedRoomCharacteristics[${index}].id`} onChange={handleChange} />} label={item.name} />
                                    )
                                }

                            </FormGroup>
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.selectedRoomCharacteristics}
                            </Typography>}
                        </MDBox>
                        <MDBox mb={2}>
                            <FormLabel sx={{ fontSize: "15px" }} id="">Features of Building </FormLabel>
                            <FormGroup >{
                                listingFeatures.map((item, index) =>
                                    <FormControlLabel key={item._id} sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal" } }} control={<Checkbox name={`selectedFeatures[${index}].id`} value={item._id} onChange={handleChange} />} label={item.name} />
                                )}
                            </FormGroup>
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.selectedFeatures}
                            </Typography>}
                        </MDBox>
                        <MDBox mb={2}>
                            <FormLabel sx={{ fontSize: "15px" }} id="">Is the property adapted for people with
                                reduced mobilty? </FormLabel>

                            <FormGroup >
                                {accessibilityItem.map((item, index) =>
                                    <FormControlLabel key={item._id} sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal", width: "90%", marginTop: "20px" } }} control={<Checkbox name={`selectedAccessibilityItems[${index}].id`} value={item._id} onChange={handleChange} />} label={item.name} />
                                )}
                            </FormGroup>
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.selectedAccessibilityItems}
                            </Typography>}
                        </MDBox>
                        <MDBox mb={2}>
                            <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label">Heating Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={values.heatingTypeId}
                                    label="Select Operation"
                                    onChange={handleChange}
                                    name="heatingTypeId"
                                    sx={{ py: 1.5, '& .MuiSelect-icon': { display: "block", fontSize: "20px  !important" } }}


                                >
                                    {heatingType?.map((value) =>

                                        <MenuItem key={value._id} value={value._id}>{value.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.heatingTypeId}
                            </Typography>}
                        </MDBox>
                        <MDBox mb={2}>
                            <FormLabel sx={{ fontSize: "15px" }}>Room Shared With </FormLabel>
                            <Grid container justifyContent="space-evenly">

                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    // defaultValue={Identity}
                                    value={values.roomSharedWith}
                                    name="roomSharedWith"
                                    sx={{ fontSize: "10px", width: "100%" }}
                                    onChange={handleChange}
                                >
                                    <Grid container justifyContent="space-evenly" >
                                        <Grid item>

                                            <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal" } }} control={<Radio value={1} />} label="1 Person" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal" } }} control={<Radio value={2} />} label="2 Persons" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal" } }} control={<Radio value={3} />} label="3 Persons or More" />
                                        </Grid>
                                    </Grid>



                                </RadioGroup>

                            </Grid>
                            {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                                {errors.roomSharedWith}
                            </Typography>}
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
                        <MDInput type="date" label="" sx={{ "& .MuiOutlinedInput-notchedOutline legend": { display: "none" } }} value={values.availableFrom} name="availableFrom" onChange={handleChange} fullWidth />
                        {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                            {errors.availableFrom}
                        </Typography>}
                    </MDBox>
                    <MDBox mb={2}>

                        <Typography variant="string" sx={{ fontSize: "15px" }}>About the people currently living in the house </Typography>
                        <MDInput type="number" label="" sx={{ "& .MuiOutlinedInput-notchedOutline legend": { display: "none" } }} name="currentResidentCount" onChange={handleChange} fullWidth />
                        {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                            {errors.currentResidentCount}
                        </Typography>}
                    </MDBox>
                    <MDBox mb={2} >
                        <FormControl sx={{ width: "100%" }}>
                            <FormLabel sx={{ fontSize: "15px" }} id="demo-radio-buttons-group-label">Does Anyone currently Living in the Property?</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                // defaultValue="female"
                                name="isOwnerLivingInProperty"
                                value={values.isOwnerLivingInProperty}
                                onChange={handleChange}
                                sx={{ fontSize: "10px", width: "100%" }}

                            >
                                <Grid container justifyContent="space-evenly" >
                                    <Grid item>

                                        <FormControlLabel xs={6} value="true" control={<Radio />} label="Yes" />
                                    </Grid>
                                    <Grid item>
                                        <FormControlLabel xs={6} value="false" control={<Radio />} label="No" />
                                    </Grid>
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                        {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                            {errors.isOwnerLivingInProperty}
                        </Typography>}
                    </MDBox>
                    <MDBox mb={2}>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Gender of Person</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.genderPreferenceId}
                                label="Select Operation"
                                onChange={handleChange}
                                name="genderPreferenceId"
                                sx={{ py: 1.5, '& .MuiSelect-icon': { display: "block", fontSize: "20px  !important" } }}


                            >
                                {gender?.map((value) =>

                                    <MenuItem key={value._id} value={value._id}>{value.name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                            {errors.genderPreferenceId}
                        </Typography>}
                    </MDBox>
                    <MDBox mb={2}>
                        <FormLabel sx={{ fontSize: "15px" }} id="">Occupation </FormLabel>
                        <FormGroup >
                            {occupationType.map((item, index) =>
                                <FormControlLabel key={item._id} sx={{ "& .MuiFormControlLabel-label": { fontWeight: "normal" } }} control={<Checkbox name={`occupationTypeId[${index}].id`} value={item._id} onChange={handleChange} />} label={item.name} />
                            )}
                        </FormGroup>
                        {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                            {errors.occupationTypeId}
                        </Typography>}
                    </MDBox>
                    <MDBox mb={2}>
                        {/* <MDBox mb={2}> */}

                        <Typography variant="string" sx={{ fontSize: "15px" }}>Minimum Stay </Typography>
                        <MDInput sx={{ "& .MuiOutlinedInput-notchedOutline legend": { display: "none" } }} label="" name="minStay" onChange={handleChange} fullWidth />

                        {/* </MDBox> */}
                        {/* <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Minimum Stay</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={10}
                                label="Minimum Stay"
                                onChange={handleChange}
                                sx={{ py: 1.5 }}


                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl> */}
                        {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                            {errors.minStay}
                        </Typography>}
                    </MDBox>

                    <MDBox mb={2}>

                        <Typography variant="string" sx={{ fontSize: "15px" }}>Price</Typography>
                        <MDInput sx={{ "& .MuiOutlinedInput-notchedOutline legend": { display: "none" } }} type="number" label="" name="price" onChange={handleChange} fullWidth />
                        {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                            {errors.price}
                        </Typography>}
                    </MDBox>
                    <MDBox mb={2}>

                        <Typography variant="string" sx={{ fontSize: "15px" }}>Community Fees (Optional) </Typography>
                        <MDInput sx={{ "& .MuiOutlinedInput-notchedOutline legend": { display: "none" } }} type="number" label="" name="communityFee" onChange={handleChange} fullWidth />

                    </MDBox>
                    <MDBox mb={2}>

                        <Typography variant="string" sx={{ fontSize: "15px" }}>Deposit (Optional) </Typography>
                        <MDInput sx={{ "& .MuiOutlinedInput-notchedOutline legend": { display: "none" } }} type="number" label="" name="deposit" onChange={handleChange} fullWidth />

                    </MDBox>
                    <MDBox mb={2}>
                        <Typography variant="string" sx={{ fontSize: "15px" }}>Upload Images </Typography>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <MDButton variant="contained" color="info" component="label" >
                                Upload
                                <input hidden accept="image/* video/*" multiple type="file" onChange={(event) => {

                                    try {
                                        const files = event.target.files;
                                        console.log(files);
                                        let myFiles = Array.from(files);
                                        console.log(myFiles);
                                        // const data = myFiles.map((item) => item.name)
                                        setImages(myFiles);



                                    }
                                    catch (e) {
                                        console.log(e);
                                    }
                                    // setFieldValue("imagePaths", data);
                                    // setImages(myFiles);
                                }} />


                                <PhotoCamera />

                            </MDButton>


                        </Stack>

                        {/* <img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600"></img> */}
                        {images.map((item, index) => <Typography key={index}>{item.name}</Typography>)}
                        {<Typography display="block" variant="string" color="red" sx={{ fontSize: "12px" }} my={1}>
                            {errors.imagePaths}
                        </Typography>}
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