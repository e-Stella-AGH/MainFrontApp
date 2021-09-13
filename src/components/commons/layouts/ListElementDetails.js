<<<<<<< HEAD:src/components/commons/layouts/ListElementDetails.js
import {colors} from "../../../utils/colors";
import {constants} from "../../../utils/constants";
import {Card} from "@material-ui/core";
=======
import {constants} from "../../utils/constants";
import {Card, useTheme} from "@material-ui/core";
>>>>>>> origin/master:src/components/commons/ListElementDetails.js

export const ListElementDetails = ({cardContent}) => {

    const theme = useTheme()

    return (
        <div>
            <Card variant="outlined"
                  style={{width: "90%", marginRight: "auto", marginLeft: "auto", padding: "10px", backgroundColor: theme.palette.card.background,
                      marginBottom: "1em", overflowY: 'scroll', maxHeight: `calc(100vh - 10em - ${constants["navbar_height"]})`}}>
                {cardContent}
            </Card>
        </div>
    )
}