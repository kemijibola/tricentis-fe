import {
    createTheme,
    CssBaseline, Grid, ThemeProvider,
} from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import Routes from './routes/Routes';

const App: FunctionComponent = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
        },
    });

    return (
        <Grid container data-testid="app-component">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Grid item xs={12}>
                    <Routes />
                </Grid>
            </ThemeProvider>
        </Grid>
    );
};

export default App;
