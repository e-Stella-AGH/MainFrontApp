import {ListElementDetails} from "../commons/ListElementDetails";
import {CardContent} from "@material-ui/core";

export const ApplicationDetails = ({application}) => {

    console.log(application)

    const getCardContent = () => {
        return <CardContent>XD</CardContent>
    }

    return (
        <ListElementDetails cardContent={getCardContent()} />
    )
}