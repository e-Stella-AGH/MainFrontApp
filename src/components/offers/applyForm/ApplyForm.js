//import Swal from "sweetalert2";
//import {offersAPI} from "../../../utils/OfferApi";
import {useParams} from "react-router-dom";
import {Box, TextField} from "@material-ui/core";
//import {useEffect, useState} from "react";

export const ApplyForm = () => {

    const { id } = useParams()
    // uncomment after master merge

    // const apply = () => {
    //     let swal = new Swal({
    //         title: "Applying..."
    //     })
    //     Swal.showLoading()
    //     offersAPI.apply(id)
    //         .then(() => {
    //             swal.close()
    //             Swal.fire({
    //                 title: "Success",
    //                 text: "You've successfully applied to this offer!",
    //                 icon: "success"
    //             })
    //         })
    //         .catch((err) => {
    //             swal.close()
    //             Swal.fire({
    //                 title: err,
    //                 text: "We couldn't apply you on this offer",
    //                 icon: "error",
    //                 confirmButtonText: "ok"
    //             })
    //         })
    // }

    return(
        <Box style={{width: "80%", marginLeft: "auto", marginRight: "auto"}}>
            <Box m={4}>
                <TextField
                    label="Name"
                    fullWidth
                    variant="outlined"
                />
            </Box>
            <Box m={4}>
                <TextField
                    label="Surname"
                    fullWidth
                    variant="outlined"
                />
            </Box>
            <Box m={4}>
                <TextField
                    id="email"
                    label="E-mail address"
                    fullWidth
                    variant="outlined"
                />
            </Box>
        </Box>
    )
}