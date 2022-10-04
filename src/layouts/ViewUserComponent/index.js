/*eslint-disable*/
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import homeDecor2 from "assets/images/team-4.jpg";
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import Box from '@mui/material/Box';

import { RotatingLines } from "react-loader-spinner";
import Modal from '@mui/material/Modal';
import { getUser } from 'api';
import { useParams } from 'react-router-dom';





export default function MediaCard() {

    const { userId } = useParams();
    const [user, setUser] = React.useState({})
    console.log(userId);
    React.useEffect(() => {
        async function call() {

            try {

                const { data } = await getUser(userId)
                // console.log(data.user);
                setUser(data.user);
            }
            catch (e) {
                console.log(e);
            }

        }
        call();
    }
        , [])
    return (
        <>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            > */}

            <DashboardLayout>
                <DashboardNavbar />
                {user.hasOwnProperty("name") ? <Card sx={{ maxWidth: 345, marginX: "auto" }}>
                    <CardMedia
                        component="img"
                        height="240"
                        image={homeDecor2}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Name
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user.name}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Email
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user.email}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Gender
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user.gender}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Phone No
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user.phoneNo}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Address
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user.address}
                        </Typography>
                    </CardContent>
                    {/* <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions> */}
                </Card> : <Box sx={{ textAlign: "center" }}> <RotatingLines strokeColor="grey" strokeWidth="3" animationDuration="0.75" width="40" visible={true} /> </Box>
                }
            </DashboardLayout>
            {/* </Modal> */}
        </>
    );
}
