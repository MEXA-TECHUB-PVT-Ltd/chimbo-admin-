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
import { Button, IconButton, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { getAllHeatingTypes } from "api";
import { deleteHeatingType } from "api";
import { Navigate } from "react-router-dom";
import Tables from "../index";
import { getAllPropertyTypes } from "api";
import { deletePropertyType } from "api";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import swal from 'sweetalert';

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

    const handleClick = async (id, name) => {
        try {
            const willDelete = await swal({
                title: "Are you sure?",
                text: `Are you sure that you want to delete ${name}?`,
                icon: "warning",
                dangerMode: true,
            });
            let text = "Do you want to delete?";
            if (willDelete) {
                // await swal("Deleted!", `Property Type ${name} has been deleted!`, "success");
                const { data } = await deletePropertyType(id);
                console.log(data);
                if (data.status === 200) {
                    // window.location.reload(false);
                    window.location.href = "/propertyTypes?action=done";
                    // return <Tables name="Heating Types" />
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

                        {index + 1}
                    </MDBox>
                ),
                Name: (
                    <MDBox ml={-1}>

                        {name}
                    </MDBox>
                ),
                Delete: (
                    <MDTypography variant="caption" color="text" fontWeight="medium">
                        <IconButton onClick={() => { handleClick(_id, name) }}>
                            <Tooltip title="Delete">
                                <DeleteIcon sx={{ color: "#1A73E8" }} />
                            </Tooltip>
                        </IconButton>
                    </MDTypography>
                ),
                Update: (
                    <MDTypography variant="caption" color="text" fontWeight="medium">
                        <IconButton href={`/propertyTypes/propertyTypeForm/${_id}`}>
                            <Tooltip title="Update">
                                <UpdateIcon sx={{ color: "#1A73E8" }} />
                            </Tooltip>
                        </IconButton>
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


