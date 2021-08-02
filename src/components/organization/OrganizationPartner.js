import {Box, Card, CardContent, Divider, Typography} from "@material-ui/core";
import {colors} from "../../utils/colors";

export const OrganizationPartner = ({firstName, lastName, mail}) => {
    return (
        <Box m={2}>
            <Card style={{backgroundColor: colors.palette[8]}}>
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