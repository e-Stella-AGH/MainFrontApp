import {useParams} from "react-router-dom";

export const ApplicationsView = () => {

    const { offerId } = useParams()

    return (
        <>Applications: {offerId}</>
    )
}