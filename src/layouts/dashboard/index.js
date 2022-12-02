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

// @mui material components
/*eslint-disable*/
import Grid from "@mui/material/Grid";
import Datetime from 'react-datetime';
// Material Dashboard 2 React components
import { format } from 'date-fns'
import MDBox from "components/MDBox";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import dayjs from 'dayjs';
// Data
import { DatePicker, YearPicker } from '@mui/x-date-pickers';
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useEffect, useState } from "react";
import { getCount } from "api";
import MDTypography from "components/MDTypography";
import { getCharData } from "api";
import { TextField } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UpdateIcon from '@mui/icons-material/Update';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';

function Dashboard() {

  const reportsBarChartData = {
    labels: ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { label: "Sales", data: [50, 20, 10, 22, 50, 10, 40, 20, 30, 50, 60, 22] },
  };
  const [date, setDate] = useState(format(new Date(), "yyyy"));
  const [count, setCount] = useState({});
  const [chartData, setChartData] = useState({});
  const { sales, tasks } = reportsLineChartData;
  useEffect(() => {
    async function call() {
      var monthArray = [];
      var countArray = [];
      try {

        const { data } = await getCount();
        setCount(data.listing)
        const { data: chartData } = await getCharData({ "year": 2022 });
        console.log(chartData);
        chartData?.listing.map((element) => {
          monthArray.push(element.month)
          countArray.push(element.count)

        })
        console.log(monthArray);
        console.log(countArray);
        reportsBarChartData.labels = monthArray;
        reportsBarChartData.datasets.data = countArray;
        setChartData(reportsBarChartData);
        // console.log(data.user);
        // setUser(data.user);
      }
      catch (e) {
        console.log(e);
      }

    }
    call();
  }
    , [])

  console.log(date);
  useEffect(() => {
    async function call() {
      var monthArray = [];
      var countArray = [];
      try {


        const { data: chartData } = await getCharData({ "year": date });
        console.log(chartData);
        chartData?.listing.map((element) => {
          monthArray.push(element.month)
          countArray.push(element.count)

        })
        console.log(monthArray);
        console.log(countArray);
        reportsBarChartData.labels = monthArray;
        reportsBarChartData.datasets.data = countArray;
        setChartData(reportsBarChartData);
        // console.log(data.user);
        // setUser(data.user);
      }
      catch (e) {
        console.log(e);
      }

    }
    call();
  }, [date])

  // console.log(format(new Date(date), "yyyy"));

  return count.hasOwnProperty("adminListings") && (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"

                title="No of listings added by Admin"
                count={count?.adminListings}
                icon="weekend"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="No of listings added by other Users "
                count={count?.userListings}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        <MDBox mt={5} mb={4} lg={10} sx={{ textAlign: "end" }}>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={3} >


              <Grid item xs={12} md={12}>
                {/* <FormControl sx={{ width: "30%" }}>
                  <InputLabel id="demo-simple-select-label">Select year</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={date}
                    onChange={(newValue) => { setDate(newValue) }}
                    label="Select Year"
                    IconComponent={() => <InsertInvitationIcon />}
                    sx={{ height: "45px", '& .MuiSvgIcon-root': { marginRight: 2, display: "block", fontSize: "30px  !important" } }}
                  >{[...Array(1000)].map((x, i) =>
                    <MenuItem key={i} value={date}>{i + 2000}</MenuItem>

                  )}

                  </Select>
                </FormControl> */}
                <DatePicker
                  disableFuture

                  label="Pick an year"
                  openTo="year"
                  views={['year']}
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  sx={{
                    width: "100%", "&.PrivatePickersYear-button.Mui-selected": {
                      backgroundColor: "#1890ff !important"
                    }
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </MDBox>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Monthly Added Listings"


                  chart={chartData}

                />
                {console.log(chartData)}
              </MDBox>
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>*/}
          </Grid>
        </MDBox>
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout >
  );
}

export default Dashboard;
