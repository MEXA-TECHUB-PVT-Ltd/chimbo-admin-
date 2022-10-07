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
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


// Material Dashboard 2 React example components
import { RotatingLines } from "react-loader-spinner";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import PGButton from "components/PaginationButton/PaginationButtonRoot";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// Data
import { useListingData } from "layouts/tables/data/ListingsData";
// import projectsTableData from "layouts/tables/data/projectsTableData";
import { useEffect, useState } from "react";
import { getAllListings } from "api";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import { NBButton } from "components/PaginationButton/PaginationButtonRoot";
import { useHeatingData } from "./data/HeatingTypeData";
import { usePropertyData } from "./data/PropertyTypeData";
import { useRoomCharacteristicData } from "./data/RoomCharacteristicData";
import { useViewUsers } from "./data/UserData";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
function Tables({ name }) {
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])
  const [pages, setPages] = useState([])
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(1)
  // const [loading, Isloading] = useState(true);


  async function call() {
    if (name === "Listings") {

      const { columns, rows, totalPages } = await useListingData(pageNo);
      setColumns(columns)
      setRows(rows)
      setPages(new Array(totalPages).fill(null).map((v, i) => i));
    }

    else if (name === "Heating Types") {
      const { columns, rows } = await useHeatingData();
      setColumns(columns)
      setRows(rows)
    }
    else if (name === "Property Types") {
      const { columns, rows } = await usePropertyData();
      setColumns(columns)
      setRows(rows)
    }
    else if (name === "Room Characteristics") {
      const { columns, rows } = await useRoomCharacteristicData();
      setColumns(columns)
      setRows(rows)
    }
    else if (name === "Users") {
      const { columns, rows } = await useViewUsers();
      setColumns(columns)
      setRows(rows)
    }

  }




  useEffect(() => {
    // window.location.reload(false);
    setColumns([])
    setRows([])
    async function chk1() {
      try {
        await call();
      }
      catch (e) {
        console.log(e);
      }

    }
    chk1();
  }, [name, pageNo])



  const goPrevious = () => {
    setPageNo(Math.max(1, pageNo - 1));
  };

  const goForward = () => {
    setPageNo(Math.min(pageNo + 1, pages.length));
  };



  const handleClick = () => {

    if (name === "Listings") {

      navigate("/listingForm")
    }
    else if (name === "Heating Types") {

      navigate("/heatingTypeForm/null")
    }
    else if (name === "Property Types") {

      navigate("/propertyTypeForm/null")
    }
    else if (name === "Room Characteristics") {

      navigate("/roomCharacteristicForm/null")
    }


  }

  // const pages s= [1, 2, 3]


  return (
    <>

      <DashboardLayout>
        <DashboardNavbar />

        <MDBox sx={{ textAlign: "end" }}>
          {name !== "Users" && <MDButton variant="gradient" color="info" small="true" onClick={handleClick} >
            Add {name} +
          </MDButton>}
        </MDBox>
        {(columns.length === 0 && rows.length === 0) ? <Box sx={{ textAlign: "center" }}> <RotatingLines strokeColor="grey" strokeWidth="3" animationDuration="0.75" width="40" visible={true} /> </Box> :
          <MDBox pt={6} pb={3}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Card>
                  <MDBox
                    mx={2}
                    mt={-3}
                    py={3}
                    px={2}
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                  >
                    <MDTypography variant="h6" color="white">
                      {name}
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={3}>
                    <DataTable
                      table={{ columns, rows }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                    />
                  </MDBox>
                </Card>
              </Grid>
              {/* <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid> */}

            </Grid>
            {name === "Listings" &&
              <MDBox sx={{ mt: "40px", justifyContent: "center", gap: "10px", display: "flex" }} >
                <PGButton
                  onClick={() => {
                    goPrevious();
                  }}
                  color="error"
                  sx={{ borderRadius: 15, p: "1rem 0rem" }}
                >
                  {"<"}
                </PGButton>
                {pages.map((pageIndex) => (
                  <NBButton
                    key={pageIndex}
                    sx={{ ...(pageNo === pageIndex + 1 && { color: "white !important", background: "#1A73E8" }) }}
                    onClick={() => {
                      setPageNo(pageIndex + 1);
                    }}
                  >
                    {pageIndex + 1}
                  </NBButton>
                ))}
                <PGButton
                  color="info"
                  sx={{ borderRadius: 15, p: "1rem 0rem" }}
                  onClick={() => {
                    goForward();
                  }}
                >
                  {">"}
                </PGButton>
              </MDBox>
            }
          </MDBox>}
        {/* <Footer /> */}

      </DashboardLayout >
      {/* } */}
    </>
  );
}

export default Tables;
