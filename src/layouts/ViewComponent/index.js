/*eslint-disable*/
import * as React from 'react';
import 'antd/dist/antd.css';
import axios from "axios"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Image } from 'antd';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Dashboard from 'layouts/dashboard';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
// import homeDecor2 from "assets/images/download.png";
import { Stack } from '@mui/system';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getListing } from 'api';
import { getAllListingFeatures } from 'api';
import { format } from 'date-fns'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import { RotatingLines } from "react-loader-spinner";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Box } from '@mui/material';
import ImageViewer from 'ImageViewer';
import { getGender } from 'api';
import BASE_URL from 'BASE_URL';
export default function MediaCard() {
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    const [dotPosition, setDotPosition] = useState('top');

    const handlePositionChange = ({ target: { value } }) => {
        setDotPosition(value);
    };

    const { listingID } = useParams()
    console.log(listingID);
    const [gListing, setListing] = useState([])
    const [genderListing, setGenderListing] = useState('')
    const [floorListing, setFloorListing] = useState('')
    const [propertyTypeIdListing, setpropertyTypeIdListing] = useState('')
    const [heatingTypeIdListing, setheatingTypeIdListing] = useState('')
    const [occupationTypeIdListing, setoccupationTypeIdListing] = useState([])
    const [ImagesPaths, setImagesPaths] = useState([])
    const [selectedFeaturesListing, setselectedFeaturesListing] = useState([])
    const [selectedRoomCharacteristicsListing, setselectedRoomCharacteristicsListing] = useState([])
    const [selectedAccessibilityListing, setselectedAccessibilityListing] = useState([])
    useEffect(() => {
        async function call() {
            try {
                console.log("hasnat");
                const { data } = await getListing(listingID);
                console.log("adghjhsfjksdfjkf");
                console.log(data[0].genderPreferenceId);
                setListing(data[0]);
                if (data[0].genderPreferenceId === undefined) {
                    setGenderListing("NULL")
                } else {
                    axios.get(`${BASE_URL}/api/genders/get/${data[0].genderPreferenceId}`)
                        .then((response) => {
                            console.log("response")
                            console.log(response.data.gender.name)
                            setGenderListing(response.data.gender.name)
                        })
                        .catch(error => console.error(`Error:${error}`));
                }
                if (data[0].floor === undefined) {
                    setFloorListing("NULL")
                } else {
                    axios.get(`${BASE_URL}/api/floors/get/${data[0].floor}`)
                        .then((response) => {
                            console.log("response")
                            console.log(response.data.Floor.name)
                            setFloorListing(response.data.Floor.name)
                        })
                        .catch(error => console.error(`Error:${error}`));
                }
                if (data[0].propertyTypeId === undefined) {
                    setpropertyTypeIdListing("NULL")
                } else {
                    axios.get(`${BASE_URL}/api/property-types/get/${data[0].propertyTypeId}`)
                        .then((response) => {
                            console.log("response")
                            console.log(response.data.propertyType.name)
                            setpropertyTypeIdListing(response.data.propertyType.name)


                        })
                        .catch(error => console.error(`Error:${error}`));
                }
                if (data[0].heatingTypeId === undefined) {
                    setheatingTypeIdListing("NULL")
                } else {
                    axios.get(`${BASE_URL}/api/heating-types/get/${data[0].heatingTypeId}`)
                        .then((response) => {
                            console.log("response")
                            console.log(response.data.heatingType.name)
                            setheatingTypeIdListing(response.data.heatingType.name)

                        })
                        .catch(error => console.error(`Error:${error}`));
                }
                if (data[0].occupationTypeId.length === 0) {
                    setoccupationTypeIdListing("NULL")
                } else {

                    let result = data[0].occupationTypeId
                    console.log("result")
                    console.log(result)
                    let users = [];
                    let promises = [];
                    for (let i = 0; i < result.length; i++) {
                        promises.push(

                            axios.get(`${BASE_URL}/api/occupation-types/get/${result[i].id}`).then(response => {
                                // do something with response

                                users.push(response.data.occupationType.name);
                            })
                        )
                    }

                    Promise.all(promises).then(() => {
                        console.log(users)
                        setoccupationTypeIdListing(users)
                    }
                    );
                }
                // Room 
                if (data[0].selectedRoomCharacteristics.length === 0) {
                    setselectedRoomCharacteristicsListing("NULL")
                } else {

                    let result = data[0].selectedRoomCharacteristics
                    console.log("result")
                    console.log(result)
                    let users = [];
                    let promises = [];
                    for (let i = 0; i < result.length; i++) {
                        promises.push(

                            axios.get(`${BASE_URL}/api/room-characteristics/get/${result[i].id}`).then(response => {
                                // do something with response

                                users.push(response.data.roomCharacteristic.name);
                            })
                        )
                    }

                    Promise.all(promises).then(() => {
                        console.log(users)
                        setselectedRoomCharacteristicsListing(users)
                    }
                    );
                }
                // Features 
                if (data[0].selectedFeatures.length === 0) {
                    setselectedFeaturesListing("NULL")
                } else {

                    let result = data[0].selectedFeatures
                    console.log("result")
                    console.log(result)
                    let users = [];
                    let promises = [];
                    for (let i = 0; i < result.length; i++) {
                        promises.push(

                            axios.get(`${BASE_URL}/api/listing-features/get/${result[i].id}`).then(response => {
                                // do something with response

                                users.push(response.data.listingFeature.name);
                            })
                        )
                    }

                    Promise.all(promises).then(() => {
                        console.log(users)
                        setselectedFeaturesListing(users)
                    }
                    );
                }
                // setselectedAccessibilityListing
                // Accessibility 
                if (data[0].selectedAccessibilityItems.length === 0) {
                    setselectedAccessibilityListing("NULL")
                } else {

                    let result = data[0].selectedAccessibilityItems
                    console.log("result")
                    console.log(result)
                    let users = [];
                    let promises = [];
                    for (let i = 0; i < result.length; i++) {
                        promises.push(

                            axios.get(`${BASE_URL}/api/accessibility-items/get/${result[i].id}`).then(response => {
                                // do something with response

                                users.push(response.data.accessibilityItem.name);
                            })
                        )
                    }

                    Promise.all(promises).then(() => {
                        console.log(users)
                        setselectedAccessibilityListing(users)
                    }
                    );
                }
                setImagesPaths(data[0].imagePaths)
            }
            catch (e) {
                console.log(e);
            }

        }
        call();


    }, [])
    console.log(gListing);

    return (
        <>

            <DashboardLayout >
                <DashboardNavbar />
                {/* {gListing.hasOwnProperty('city') ? */}

                < Card sx={{ maxWidth: "100%" }}>
                    <CardMedia>
                        <Stack direction="row" sx={{ width: '100%', overflow: 'auto' }} spacing={5} justifyContent="center">
                        
                        {ImagesPaths.map((item, index) =>
                        <Avatar alt="Remy Sharp" variant='square' src={`${BASE_URL}/${item}`} style={{width:"100px",height:"100px"}} />
                        )}

                        </Stack>
                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            City
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                            {gListing.city === undefined ? <span>Null</span> : <span>{gListing.city}</span>}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Street Name
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                            {gListing.streetName === undefined ? <span>Null</span> : <span>{gListing.streetName}</span>}

                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Street No
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                            {gListing.streetNo === undefined ? <span>Null</span> : <span>{gListing.streetNo}</span>}

                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Price
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                            {gListing.price === undefined ? <span>Null</span> : <span>{gListing.price}</span>}

                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Available From
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                            {/* {format(new Date(gListing?.availableFrom), "dd-MM-yyyy")} */}
                            {gListing.availableFrom === undefined ? <span>Null</span> : <span>{gListing.availableFrom.slice(0, 10)}</span>}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            No of People currently living
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                            {gListing?.currentResidentCount}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Preferred Gender
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                            {genderListing}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            No of Beds
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                            {gListing.beds === undefined ? <span>Null</span> : <span>{gListing.beds}</span>}

                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            No of Baths
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                            {gListing.baths === undefined ? <span>Null</span> : <span>{gListing.baths}</span>}

                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Floor
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                            {floorListing}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Residential Address
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                            {gListing.rAddress === undefined ? <span>Null</span> : <span>{gListing.rAddress}</span>}

                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Property Type
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                            {propertyTypeIdListing}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Heating Type
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                            {heatingTypeIdListing}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Preferred Occupation
                        </Typography>

                        {occupationTypeIdListing.map((item, index) =>
                            <Typography key={index} variant="body2" color="text.secondary">
                                {item}
                            </Typography>
                        )}

                    </CardContent>
                    {/* <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Specificaitons
                            </Typography>
                            {gListing.specifications.map((item, index) =>
                                <Typography key={index} variant="body2" color="text.secondary">
                                    <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                    {item.specification?.name === "Is smoking allowed?" && "Smoking Allowed"}
                                    {item.specification?.name === "Does the property have a lift?" && "Property has a Lift"}
                                    {item.specification?.name === "Are couples allowed to share room and expenses?" && "Couples are Allowed to share room and expense"}
                                    {item.specification?.name === "Are pets allowed?" && "Pets are Allowed"}
                                    {item.specification?.name === "Are minors allowed?" && "Minors are Allowed"}


                                </Typography>
                            )}
                        </CardContent> */}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Room Characteristics
                        </Typography>
                        {selectedRoomCharacteristicsListing.map((item, index) =>
                            <Typography key={index} variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                {/* {item.roomCharacteristic?.name} */}
                                {item}
                            </Typography>
                        )}
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Features
                        </Typography>
                        {selectedFeaturesListing.map((item, index) =>
                            <Typography key={index} variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                {item}
                            </Typography>
                        )}
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Accessibility
                        </Typography>
                        {selectedAccessibilityListing.map((item, index) =>
                            <Typography key={index} variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                {/* {item?.accessibilityItem?.name} */}
                                {item}
                            </Typography>
                        )}
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Preferred Contant No
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                            {gListing?.pContact}
                        </Typography>
                    </CardContent>
                    {/* <CardContent>
                            <Typography gutterBottom variant="h5" component="div">

                                Advertiser
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                Name: {gListing?.advertiser?.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                Phone No: {gListing?.advertiser?.phone}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                Email: {gListing?.advertiser?.email}
                            </Typography>

                        </CardContent> */}

                </Card>
                {/* :  */}
                {/* <Box sx={{ textAlign: "center" }}> <RotatingLines strokeColor="grey" strokeWidth="3" animationDuration="0.75" width="40" visible={true} /> </Box>} */}
            </DashboardLayout >
        </>
    );
}
