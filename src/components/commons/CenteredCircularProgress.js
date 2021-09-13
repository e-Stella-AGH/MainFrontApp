import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

const CenteredCircularProgress = (props) =>
    <div style={{display: "flex", justifyContent: "center", marginTop: "2em"}}>
        <CircularProgress {...props} />
    </div>

export default CenteredCircularProgress