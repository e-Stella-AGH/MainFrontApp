import {Box, Card, CardContent, Divider, Typography} from "@material-ui/core";

export const OfferSkill = ({ name, skillLevel }) => {

    return (
        <Box m={2}>
            <Card>
                <CardContent>
                    <Box m={1}>
                        <Typography>
                            {name}
                        </Typography>
                    </Box>
                    <Divider />
                    <Box m={1}>
                        <Typography color="textSecondary">
                            {skillLevel}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}