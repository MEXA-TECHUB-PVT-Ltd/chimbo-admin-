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
import Alert from '@mui/material/Alert';
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { getAllListings } from "api";
import { deleteListing } from "api";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
export const useListingData = async (pageNo) => {


  console.log("Hasnat");
  var totalPages;

  async function chk() {

    const resp = await getAllListings(pageNo);
    totalPages = resp.data.totalPages;
    return resp.data.listings


  }
  const handleClick = async (id) => {
    try {
      let text = "Do you want to delete?";
      if (confirm(text) == true) {
        const { data } = await deleteListing(id);
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
      const { _id, price, city, streetNo, streetName, floor, beds, m2 } = field;

      // const { name } = propertyType

      // const { name: heatingName } = heatingType


      return ({


        City: (
          <MDBox ml={-1}>

            {city}
          </MDBox>
        ),
        Floor: (
          <MDBox ml={-1}>

            {floor?.name || "Not Available"}
          </MDBox>
        ),
        StreetNo: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {streetNo}
          </MDTypography>
        ),
        Price: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {price}
          </MDTypography>
        ),
        StreetName: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {streetName}
          </MDTypography>
        ),
        Beds: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {beds || "Not Available"}
          </MDTypography>
        ),
        M2: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {m2 || "Not Available"}
          </MDTypography>
        ),
        View: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <IconButton href={`/views/${_id}`}>
              <Tooltip title="view">
                <VisibilityIcon sx={{ color: "#1A73E8" }} />
              </Tooltip>
            </IconButton>
          </MDTypography>
        ),
        Delete: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <IconButton onClick={() => { handleClick(_id) }}>
              <Tooltip title="Delete">
                <DeleteIcon sx={{ color: "#1A73E8" }} />
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


      { Header: "City", accessor: "City", align: "center" },
      { Header: "Price", accessor: "Price", align: "center" },
      { Header: "Street Name", accessor: "StreetName", align: "center" },
      { Header: "Street No", accessor: "StreetNo", align: "center" },
      { Header: "Beds", accessor: "Beds", align: "center" },
      { Header: "Floor", accessor: "Floor", align: "center" },
      { Header: "M2", accessor: "M2", align: "center" },
      { Header: "View", accessor: "View", align: "center" },
      { Header: "Delete", accessor: "Delete", align: "center" },
      // { Header: "action3", accessor: "action3", align: "center" },
    ],






    rows: arrayData,
    totalPages: totalPages,



  })
}


