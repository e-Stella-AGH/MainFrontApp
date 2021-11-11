import {Card, CardContent, Divider, Typography, useTheme} from "@material-ui/core";
import PropTypes from "prop-types";

export const ListElement = ({ data, selected, onClick, idx }) => {

    const theme = useTheme()

    const selectedStyle = selected ? {backgroundColor: theme.palette.focused.main} : {backgroundColor: theme.palette.card.background}

    return(
        <div style={{ width: "100%", marginBottom: "1em" }} onClick={() => onClick(data, idx)}>
            <Card variant="outlined" style={selectedStyle}>
                <CardContent style={{marginBottom: "1em"}}>
                    <Typography variant="h5">
                        {data.first}
                    </Typography>
                    <Divider />
                    <div style={{marginTop: "1em"}}>
                        <Typography style={{float: "left"}} color="textSecondary">
                            {data.second}
                        </Typography>
                        <Typography style={{float: "right"}}>
                            {data.third}
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

ListElement.propTypes = {
    data: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    idx: PropTypes.number.isRequired
}