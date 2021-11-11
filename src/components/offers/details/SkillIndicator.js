import {Box, useTheme} from "@material-ui/core";

export const SkillIndicator = (props) => {

    const theme = useTheme()

    const fullCircleStyle = {
        backgroundColor: theme.palette.focused.dark,
    }

    const emptyCircleStyle = {
        borderRadius: "50%",
        width: "15px",
        height: "15px",
        border: `1px solid ${theme.palette.focused.dark}`,
    }

    return(
        <Box m={1}>
            { props.isFilled ? <div style={{...fullCircleStyle, ...emptyCircleStyle}}/> : <div style={emptyCircleStyle}/> }
        </Box>
    )
}