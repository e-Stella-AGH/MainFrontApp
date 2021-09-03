import {Card, CardContent, Divider, Typography, useTheme} from "@material-ui/core";

export const ShortOfferDetails = ({ offer, selected, onClick, idx }) => {

    const theme = useTheme()

    const selectedStyle = selected ? {backgroundColor: theme.palette.focused.main} : {backgroundColor: theme.palette.card.light}

    return(
        <div style={{ width: "100%", marginBottom: "1em" }} onClick={() => onClick(offer, idx)}>
            <Card variant="outlined" style={selectedStyle}>
                <CardContent style={{marginBottom: "1em"}}>
                    <Typography variant="h5">
                        {offer.name}
                    </Typography>
                    <Divider />
                    <div style={{marginTop: "1em"}}>
                        <Typography style={{float: "left"}} color="textSecondary">
                            {offer.minSalary} - {offer.maxSalary}
                        </Typography>
                        <Typography style={{float: "right"}}>
                            {offer.position}
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}