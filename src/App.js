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
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import UpdateProfile from "layouts/profile/updateProfile";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import Reset from "layouts/authentication/reset-password/cover";
import EnterOtp from "layouts/authentication/reset-password/EnterOtp";
import NewPassword from "layouts/authentication/reset-password/EnterNewPassword";
import SignUp from "layouts/authentication/sign-up";
import Listing from "layouts/ListingForm"
import { useState, useEffect, useMemo } from "react";
import HeatingTypeForm from "./layouts/heatingTypeForm"
import PropertyTypeForm from "./layouts/propertyTypeForm"
import RoomCharacteristics from "./layouts/roomCharacteristicsForm"
import ViewComponent from "./layouts/ViewComponent"
import ViewUserComponent from "./layouts/ViewUserComponent"
import PrivacyPolicyTermsAndCondition from "layouts/PrivacyPolicyTermsAndCondition";
// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AdminRoutesAuth from "AdminRoutesAuth";
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import Logout from "Logout";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { useFormik } from "formik";
import { BasicGrid } from "./BasicGrid"
// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import TablePage from "layouts/TablePage";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;






  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });


  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            zIndex={-1}
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Chimbo Admin Panel"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />

        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        <Route path="/authentication/sign-in" element={<SignIn />} />
        <Route path="/authentication/sign-up" element={<SignUp />} />




        <Route path="/tables" element={<Tables />} />
        <Route path="/forgotPassword" element={<Reset />} />
        <Route path="/otp" element={<EnterOtp />} />
        <Route path="/newPassword" element={<NewPassword />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/terms-policy" element={<PrivacyPolicyTermsAndCondition />} />


        <Route element={<AdminRoutesAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/grid" element={<BasicGrid />} />
          <Route path="/listing" element={<Tables name="Listings" />} />
          <Route path="/heatingTypes" element={<Tables name="Heating Types" />} />
          <Route path="/propertyTypes" element={<Tables name="Property Types" />} />
          <Route path="/roomCha" element={<Tables name="Room Characteristics" />} />
          <Route path="/listingForm" element={<Listing />} />
          <Route path="/heatingTypeForm/:heatingTypeId" element={< HeatingTypeForm />} />
          <Route path="/propertyTypeForm/:propertyTypeId" element={< PropertyTypeForm />} />
          <Route path="/roomCharacteristicForm/:roomCharacteristicId" element={< RoomCharacteristics />} />
          <Route path="/users" element={<Tables name="Users" />} />
          <Route path="/views/:listingID" element={<ViewComponent />} />
          <Route path="/userViews/:userId" element={<ViewUserComponent />} />
          <Route path="/updateProfile/:adminId" element={<UpdateProfile />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
