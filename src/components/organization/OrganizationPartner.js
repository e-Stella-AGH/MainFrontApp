import {Box, Card, CardContent, Divider, Typography} from "@material-ui/core";
import {colors} from "../../utils/colors";

export const OrganizationPartner = ({firstname, lastname, mail}) => {
    return (
        <Box m={2}>
            <Card style={{backgroundColor: colors.palette[8]}}>
                <CardContent>
                    <Box m={1}>
                        <Typography>
                            {firstname}
                        </Typography>
                    </Box>
                    <Box m={1}>
                        <Typography>
                            {lastname}
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