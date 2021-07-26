import {useEffect} from "react";
import Swal from "sweetalert2";
import {useHistory} from "react-router-dom";

export const UnauthenticatedPage = () => {

    const history = useHistory()

    useEffect(() => {
        Swal.fire({
            title: "Unauthenticated",
            text: "We're sorry, but you're unauthenticated to go here! Try to log in, and if you think " +
                "that you should be able to come here, contact your administrator or us at estellaagh@gmail.com.",
            icon: "error"
        }).then(() => {
            history.push('/')
        })
    }, [history])

    return (
        <></>
    )
}