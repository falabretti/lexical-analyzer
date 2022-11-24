import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" component="h1" width="100%" align='center'>
                        Analisador Léxico
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;
