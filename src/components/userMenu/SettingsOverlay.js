import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {Grid} from "@material-ui/core";
import {FilesPage} from "./FilesPage";
import {jwtUtils} from "../../utils/jwt/jwtUtils";
import {userMenuTabs, userTypes} from "../../utils/Enums";
import {ProfilePage} from "./ProfilePage";
import {SettingsPage} from "./SettingsPage";
import {Redirect} from "react-router-dom";

function TabPanel({ children, value, tabName, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== tabName}
            id={`tabpanel-${tabName}`}
            aria-labelledby={`tab-${tabName}`}
            style={{padding: "1em", color: "primary"}}
            {...other}
        >
            {value === tabName && <Box>{children}</Box>}
        </div>
    );
}

function a11yProps(tabName) {
    return {
        id: `tab-${tabName}`,
        'aria-controls': `tabpanel-${tabName}`,
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
    const state = props.location?.state
    const [value, setValue] = React.useState(state?.subPage || userMenuTabs.PROFILE);
    const user = jwtUtils.getUser();

    const handleChange = (event, newValue) => setValue(newValue)

    return user ? (<Grid container>
        <Box clone order={{xs: 2, md: 1}}>
            <Grid item xs={12} md={9} lg={10}>
                <TabPanel value={value} tabName={userMenuTabs.PROFILE} dir={theme.direction}>
                    <ProfilePage />
                </TabPanel>
                <TabPanel value={value} tabName={userMenuTabs.SETTINGS} dir={theme.direction}>
                    <SettingsPage />
                </TabPanel>
                <TabPanel value={value} tabName={userMenuTabs.FILES} dir={theme.direction}>
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
                    aria-label="settings tabs"
                >
                    <Tab label="My Profile" value={userMenuTabs.PROFILE} {...a11yProps(userMenuTabs.PROFILE)} />
                    <Tab label="Settings" value={userMenuTabs.SETTINGS} {...a11yProps(userMenuTabs.SETTINGS)} />
                    {user?.userType === userTypes.JOB_SEEKER && <Tab label="Files" value={userMenuTabs.FILES} {...a11yProps(userMenuTabs.FILES)} />}}
                </Tabs>
            </Grid>
        </Box>
        </Grid>) : <Redirect to="/" />;
}