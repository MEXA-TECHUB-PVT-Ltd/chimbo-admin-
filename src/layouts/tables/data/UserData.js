/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { getAllHeatingTypes } from "api";
import { deleteHeatingType } from "api";
import { Navigate } from "react-router-dom";
import Tables from "../index";
import { getAllRoomCharacteristics } from "api";
import { deleteRoomCharacteristics } from "api";
import { getAllUsers } from "api";
import { BlockUser } from "api";
import { UnBlockUser } from "api";




export const useViewUsers = async () => {


    console.log("Hasnat");


    async function chk() {
        try {
            const resp = await getAllUsers();
            if (resp.data.status === 200) {

                return resp.data.users;
            }

        }
        catch (e) {
            console.log(e.response.data.message);
            // alert(e.response.data.message)
            return []
        }


    }

    const handleClick = async (id, status) => {
        try {
            const values = {};
            values.id = id;
            console.log(id);
            let text = `Do you want to ${status ? "UnBlock" : "Block"}`;
            if (confirm(text) == true) {
                console.log(typeof status)
                if (status === false) {

                    const { data } = await BlockUser(values);
                    if (data.status === 200) {
                        // return <Tables name="Heating Types" />
                        window.location.reload(false);
                    }

                }
                else if (status === true) {
                    const { data } = await UnBlockUser(values);
                    console.log(data);
                    if (data.status === 200) {
                        // return <Tables name="Heating Types" />
                        window.location.reload(false);
                    }

                }
            }

        }
        catch (e) {
            console.log(e);
        }
    }

    const data = await chk();

    async function chk2() {

        return data.map((field, index) => {
            const { _id, name, email, phoneNo, isBlocked } = field;




            return ({


                Name: (
                    <MDBox ml={-1}>

                        {name}
                    </MDBox>
                ),
                Email: (
                    <MDBox ml={-1}>

                        {email}
                    </MDBox>
                ),
                PhoneNo: (
                    <MDBox ml={-1}>

                        {phoneNo}
                    </MDBox>
                ),
                View: (
                    <MDTypography variant="caption" color="text" fontWeight="medium">
                        <Button href={`/userViews/${_id}`} >View</Button>
                    </MDTypography >
                ),
                Block: (
                    <MDTypography variant="caption" color="text" fontWeight="medium">
                        <Button onClick={() => { handleClick(_id, isBlocked) }}>{isBlocked ? "UnBlock" : "Block"}</Button>
                    </MDTypography>
                ),

            }
            )




        })



    }

    const arrayData = await chk2();







    return ({
        columns: [
            { Header: "Name", accessor: "Name", align: "center" },
            { Header: "Email", accessor: "Email", align: "center" },
            { Header: "PhoneNo", accessor: "PhoneNo", align: "center" },
            { Header: "View", accessor: "View", align: "center" },
            { Header: "Block", accessor: "Block", align: "center" },

        ],






        rows: arrayData



    })
}


