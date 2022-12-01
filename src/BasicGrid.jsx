/*eslint-disable*/
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const BasicGrid = ({}) => {
  return (
    <DashboardLayout sx={({ breakpoints }) => console.log(breakpoints)}>
      <DashboardNavbar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid container item xs={12} direction="column">
            <Item>Hasnat</Item>
            <Item>Badar</Item>
            <Item>Uzair</Item>
          </Grid>
          <Grid constainer item wrap="nowrap" xs={2}>
            <Item noWrap>
              xs=4my nandhfkdhfk jhjhkjhkj kjhkjhjkhkjhkjhjkhkjh kjhkjhk kjhk kjhk jhkjhdkfkj
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};
