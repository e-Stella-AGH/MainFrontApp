import {Divider} from "@material-ui/core";
import PropTypes from "prop-types";

export const StandardViewAndFilterLayout = ({filter, sorter, view}) => {

    return (
        <div>
            <div style={{marginBottom: "10px", display: "flex"}}>
                <div style={{alignItems: "flex-start"}}>
                    {filter}
                </div>
                <div style={{alignItems: "flex-end", marginLeft: "auto", marginRight: "10px"}}>
                    {sorter}
                </div>
            </div>
            <Divider/>
            {view}
        </div>
    )
}

StandardViewAndFilterLayout.propTypes = {
    filter: PropTypes.any,   //component representing filter with its view and logic
    sorter: PropTypes.any,   //component representing sorter with its view and logic
    view: PropTypes.any.isRequired      //component representing view that should be displayed
}