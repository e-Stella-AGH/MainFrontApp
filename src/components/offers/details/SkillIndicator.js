import {Box} from "@material-ui/core";
import {colors} from "../../../utils/colors";

export const SkillIndicator = (props) => {

    const fullCircleStyle = {
        backgroundColor: colors["main-light"],
    }

    const emptyCircleStyle = {
        borderRadius: "50%",
        width: "15px",
        height: "15px",
        border: `1px solid ${colors["main-light"]}`,
    }

    return(
        <Box m={1}>
            { props.isFilled ? <div style={{...fullCircleStyle, ...emptyCircleStyle}}/> : <div style={emptyCircleStyle}/> }
        </Box>
    )
}