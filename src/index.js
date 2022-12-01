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
import { store } from './app/store'
import { Provider } from 'react-redux'
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { createRoot } from 'react-dom/client'

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </BrowserRouter>
  </Provider>
  // ReactDOM.render(
  //   <BrowserRouter>
  //     <MaterialUIControllerProvider>
  //       <App />
  //     </MaterialUIControllerProvider>
  //   </BrowserRouter>,
  //   document.getElementById("root")
);
