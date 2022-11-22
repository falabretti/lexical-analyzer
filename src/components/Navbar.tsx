import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="h1">
                        Lexical Analyzer
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;
