import { TextField, Grid } from "@material-ui/core"
import { Controller } from "react-hook-form"

export const OfferFormField = (props) => <Grid item xs={12} {...props.additionalGridProps}>
    <Controller
        {...props}
        render={({field, fieldState}) => 
            <TextField 
                {...field}
                {...props.additionalTextFieldProps} 
                variant="outlined"  
                error={fieldState.error != null} 
                fullWidth
                helperText={fieldState.error?.message || " "} />
        } />
</Grid>