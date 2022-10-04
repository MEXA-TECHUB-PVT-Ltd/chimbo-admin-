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
import Alert from '@mui/material/Alert';

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
import { getAllPropertyTypes } from "api";
import { deletePropertyType } from "api";




export const usePropertyData = async () => {


    console.log("Hasnat");


    async function chk() {
        try {
            const resp = await getAllPropertyTypes()
            if (resp.data.status === 200) {

                return resp.data.propertyTypes;
            }

        }
        catch (e) {
            console.log(e.response.data.message);
            // alert(e.response.data.message)
            return []
        }


    }

    const handleClick = async (id) => {
        try {
            let text = "Do you want to delete?";
            if (confirm(text) == true) {
                const { data } = await deletePropertyType(id);
                console.log(data);
                if (data.status === 200) {
                    // return <Tables name="Heating Types" />
                    window.location.reload(false);
                }
            } else {

            }


        }
        catch (e) {
            console.log(e);
        }
    }

    const data = await chk();

    async function chk2() {

        return data.map((field, index) => {
            const { _id, name } = field;




            return ({


                ID: (
                    <MDBox ml={-1}>

                        {_id}
                    </MDBox>
                ),
                Name: (
                    <MDBox ml={-1}>

                        {name}
                    </MDBox>
                ),
                Delete: (
                    <MDTypography variant="caption" color="text" fontWeight="medium">
                        <Button onClick={() => { handleClick(_id) }}>Delete</Button>
                    </MDTypography>
                ),
                Update: (
                    <MDTypography variant="caption" color="text" fontWeight="medium">
                        <Button href={`/propertyTypeForm/${_id}`}>Update</Button>
                    </MDTypography>
                ),

            }
            )




        })



    }

    const arrayData = await chk2();







    return ({
        columns: [
            { Header: "ID", accessor: "ID", align: "center" },
            { Header: "Name", accessor: "Name", align: "center" },
            { Header: "Delete", accessor: "Delete", align: "center" },
            { Header: "Update", accessor: "Update", align: "center" },

        ],






        rows: arrayData



    })
}


