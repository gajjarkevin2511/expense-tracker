import React from 'react';
import { Box, Grid } from '@mui/material';
import Sidebar from './components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <Grid container size={12} sx={{ height: '100vh' }}>
            {/* Sidebar */}
            <Grid item size={1} sx={{ backgroundColor: '#f4f4f4', padding: 2 }}>
                <Sidebar />
            </Grid>

            {/* Main Content */}
            <Grid item size={11} sx={{ padding: 2 }}>
                <Box sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 1, padding: 2 }}>
                    <Outlet />
                </Box>
            </Grid>
        </Grid>
    );
};

export default Layout;