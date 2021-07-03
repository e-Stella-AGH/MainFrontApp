import {Grid, Slider, TextField, Typography} from "@material-ui/core";
import {useState} from "react";
import PropTypes from 'prop-types';

export const EStellaSlider = (props) => {

    const [value, setValue] = useState([props.min, props.max])

    const getValue = (event, value) => {
        return event.target.value === '' ? value : Number(event.target.value)
    }

    const getMaxValue = (event) => getValue(event, props.max)
    const getMinValue = (event) => getValue(event, props.min)

    const handleInputBlur = () => {
        if(value[0] < props.min) setValue([props.min, value[1]])
        if(value[1] > props.max) setValue([value[0], props.max])
    }

    return (
        <div style={{width: "90%", marginLeft: "auto", marginRight: "auto"}}>
            <Typography>
                {props.label}
            </Typography>
            <Slider
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={() => `${value}`}
                max={props.max}
                min={props.min}
                step={props.step}
            />
            <Grid container direction="row" style={{marginTop: "10px"}}>
                <Grid item xs={4}>
                    <TextField
                        value={value[0]}
                        onChange={(event) => setValue([getMinValue(event), value[1]])}
                        onBlur={handleInputBlur}
                        min={props.min}
                        max={value[1]}
                        type="number"
                    />
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <TextField
                        value={value[1]}
                        onChange={(event) => setValue([value[0], getMaxValue(event)])}
                        onBlur={handleInputBlur}
                        min={value[0]}
                        max={props.max}
                        type="number"
                    />
                </Grid>
            </Grid>
        </div>
    )
}

EStellaSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    step: PropTypes.number
}

EStellaSlider.defaultProps = {
    min: 0,
    max: 100,
    step: 10
}
