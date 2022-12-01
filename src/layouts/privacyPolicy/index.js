/*eslint-disable*/
import React from 'react'
import CoverLayout from 'layouts/authentication/components/CoverLayout';
import PageLayout from 'examples/LayoutContainers/PageLayout';
import Dashboard from 'layouts/dashboard';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
const PrivacyPolicy = () => {
    return (

        <DashboardLayout>
            <DashboardNavbar />
            <h1>Privacy Policy</h1>
            <div>No content</div>

        </DashboardLayout>
    )
}

export default PrivacyPolicy;
