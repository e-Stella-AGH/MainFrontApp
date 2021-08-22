import {colors} from "../../utils/colors";
import {constants} from "../../utils/constants";
import {Card} from "@material-ui/core";

export const ListElementDetails = ({cardContent}) => {

    return (
        <div>
            <Card variant="outlined"
                  style={{width: "90%", marginRight: "auto", marginLeft: "auto", padding: "10px", backgroundColor: colors.palette[9],
                      marginBottom: "1em", overflowY: 'scroll', maxHeight: `calc(100vh - 10em - ${constants["navbar_height"]})`}}>
                {cardContent}
            </Card>
        </div>
    )
}