import {Box, Card, CardContent, Divider, Typography, useTheme} from "@material-ui/core";
import React from "react";

export const OrganizationPartner = ({firstName, lastName, mail}) => {

    const theme = useTheme()

    return (
        <Box m={2}>
            <Card style={{backgroundColor: theme.palette.card.light}}>
                <CardContent>
                    <Box m={1}>
                        <Typography>
                            {firstName}
                        </Typography>
                    </Box>
                    <Box m={1}>
                        <Typography>
                            {lastName}
                        </Typography>
                    </Box>
                    <Divider />
                    <Box m={1}>
                        <Typography color="textSecondary">
                            {mail}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}