import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {Grid} from "@material-ui/core";
import {FilesPage} from "./FilesPage";
import {jwtUtils} from "../../utils/jwt/jwtUtils";
import {userTypes} from "../../utils/Enums";
import {ProfilePage} from "./ProfliePage";
import {SettingsPage} from "./SettingsPage";
import {Redirect} from "react-router-dom";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            style={{padding: "1em", color: "primary"}}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
    indicator: {
        left: "0px"
    }
}));

export default function SettingsOverlay(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const user = jwtUtils.getUser();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return user ? (<Grid container>
        <Box clone order={{xs: 2, md: 1}}>
            <Grid item xs={12} md={9} lg={10}>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <ProfilePage />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <SettingsPage />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <FilesPage />
                </TabPanel>
            </Grid>
        </Box>
        <Box clone order={{xs: 1, md: 2}}>
            <Grid item xs={12} md={3} lg={2}>
                <Tabs
                    value={value}
                    orientation="vertical"
                    onChange={handleChange}
                    indicatorColor="primary"
                    classes={{
                        indicator: classes.indicator
                    }}
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="My Profile" {...a11yProps(0)} />
                    <Tab label="Settings" {...a11yProps(1)} />
                    {user?.userType == userTypes.JOB_SEEKER && <Tab label="Files" {...a11yProps(2)} />}}
                </Tabs>
            </Grid>
        </Box>
        </Grid>) : <Redirect to="/" />;
}