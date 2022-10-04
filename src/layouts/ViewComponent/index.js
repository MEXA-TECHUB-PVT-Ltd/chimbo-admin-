/*eslint-disable*/
import * as React from 'react';
import 'antd/dist/antd.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Image } from 'antd';
import Typography from '@mui/material/Typography';
import Dashboard from 'layouts/dashboard';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import homeDecor2 from "assets/images/home-decor-2.jpg";
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
    const [gListing, setListing] = useState({})
    useEffect(() => {
        async function call() {
            try {
                console.log("hasnat");
                const { data } = await getListing(listingID);
                console.log(data);
                const { listing } = data;
                console.log(listing);
                setListing(listing);
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

                {gListing.hasOwnProperty('city') ?

                    < Card sx={{ maxWidth: "100%" }}>
                        <CardMedia>
                            <Stack direction="row" sx={{ width: '100%', overflow: 'auto' }} spacing={5} justifyContent="center">

                                <ImageViewer />


                            </Stack>
                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                City
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                {gListing.city}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Street Name
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                {gListing.streetName}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Street No
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                {gListing.streetNo}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Price
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                {gListing.price}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Available From
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                {format(new Date(gListing.availableFrom), "dd-MM-yyyy")}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                No of People currently living
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                {gListing.currentResidentCount}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Preferred Gender
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                {gListing.gender.name}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                No of Beds
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                {gListing.beds}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                No of Baths
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                {gListing.baths}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Residential Address
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                {gListing.rAddress}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Property Type
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                {gListing.propertyType.name}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Heating Type
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                {gListing.heatingType.name}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Preferred Occupation
                            </Typography>

                            {/* {console.log(gListing.occupationType[0].occupation.name)} */}
                            {gListing.occupationType.map((item, index) =>
                                <Typography key={index} variant="body2" color="text.secondary">
                                    {item.occupation.name}
                                </Typography>
                            )}

                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Specificaitons
                            </Typography>
                            {gListing.specifications.map((item, index) =>
                                <Typography key={index} variant="body2" color="text.secondary">
                                    <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                    {item.specification.name === "Is smoking allowed?" && "Smoking Allowed"}
                                    {item.specification.name === "Does the property have a lift?" && "Property has a Lift"}
                                    {item.specification.name === "Are couples allowed to share room and expenses?" && "Couples are Allowed to share room and expense"}
                                    {item.specification.name === "Are pets allowed?" && "Pets are Allowed"}
                                    {item.specification.name === "Are minors allowed?" && "Minors are Allowed"}


                                </Typography>
                            )}
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Room Characteristics
                            </Typography>
                            {gListing.roomCharacteristics.map((item, index) =>
                                <Typography key={index} variant="body2" color="text.secondary">
                                    <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                    {item.roomCharacteristic.name}
                                </Typography>
                            )}
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Features
                            </Typography>
                            {gListing.features.map((item, index) =>
                                <Typography key={index} variant="body2" color="text.secondary">
                                    <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                    {item.feature.name}
                                </Typography>
                            )}
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Accessibility
                            </Typography>
                            {gListing.accessibilityItems.map((item, index) =>
                                <Typography key={index} variant="body2" color="text.secondary">
                                    <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                    {item.accessibilityItem.name}
                                </Typography>
                            )}
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">

                                Advertiser
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                Name: {gListing.advertiser.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                Phone No: {gListing.advertiser.phone}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FiberManualRecordIcon sx={{ fontSize: "11px !important", marginRight: "5px" }} />
                                Email: {gListing.advertiser.email}
                            </Typography>

                        </CardContent>
                        {/* <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                    </Card> : <Box sx={{ textAlign: "center" }}> <RotatingLines strokeColor="grey" strokeWidth="3" animationDuration="0.75" width="40" visible={true} /> </Box>}
            </DashboardLayout >
        </>
    );
}
