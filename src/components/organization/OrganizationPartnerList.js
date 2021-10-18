import {Box, Grid, IconButton} from "@material-ui/core";
import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import {OrganizationPartner} from "./OrganizationPartner";

export const OrganizationPartnerList = ({onUserDelete, users}) =>
    <Box mt={0} mb={0}>
        <Grid container>
            {users.map((user, idx) =>
                <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                    <Grid container>
                        <Grid item xs={11}>
                            <OrganizationPartner key={idx} firstName={user.firstName} lastName={user.lastName}
                                                 mail={user.mail}/>
                        </Grid>
                        <Grid item xs={1}>
                            <Box mt={3}>
                                <IconButton aria-label="delete" onClick={() => onUserDelete(idx, user)}>
                                    <ClearIcon fontSize="medium"/>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>)}
        </Grid>
    </Box>