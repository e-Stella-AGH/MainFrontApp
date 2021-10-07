import Swal from "sweetalert2";
import {useParams} from "react-router-dom";
import {Box, Button, TextField, Typography} from "@material-ui/core";
import React, {useState} from "react";
import {offersAPI} from "../../../utils/apis/OfferApi";
import {validateEmail} from "../../../utils/functions";
import {useLoggedIn} from "../../../utils/hooks/useLoggedIn";
import {jwtUtils} from "../../../utils/jwt/jwtUtils";
import {withSwal} from "../../commons/formsCommons/WithSwal";

export const ApplyForm = () => {

    const {id} = useParams()

    const {loggedIn} = useLoggedIn()
    const user = jwtUtils.getUser()

    const [name, setName] = useState(user?.firstName || "")
    const [surname, setSurname] = useState(user?.lastName || "")
    const [email, setEmail] = useState(user?.mail || "")
    const [file, setFile] = useState(null)

    const [shouldValidateField, setShouldValidateField] = useState({
        name: false,
        surname: false,
        email: false
    })

    const apply = () => {
        if (validate()) {
            if (file === null) {
                Swal.fire({
                    title: "Warning",
                    text: "You're not including any CV file, are you sure about it?",
                    icon: "warning",
                    showDenyButton: true,
                    confirmButtonText: "Yes, I'm sure",
                    denyButtonText: "No, let me insert my CV"
                }).then(result => {
                    if (result.isConfirmed) {
                        validatedApply([])
                    } else if (result.isDenied) {
                        Swal.close()
                    }
                })
            } else {
                validatedApply([file])
            }
        } else {
            Swal.fire({
                title: "Error alert!",
                text: "Check if all fields are filled correctly",
                icon: "error",
                confirmButtonText: "OK"
            })
        }
    }

    const validatedApply = (files) => {
        withSwal({
            loadingTitle: "Applying",
            promise: () => loggedIn ? offersAPI.applyWithUser(id) : offersAPI.applyWithNoUser(id, name, surname, email, files),
            successSwalTitle: "Success",
            successSwalText: "You've successfully applied to this offer!",
            errorSwalTitle: "Something went wrong",
            errorSwalText: "We couldn't process your application for this offer",
        })
    }

    const validate = () => {
        return validateEmail(email) && validateName(name) && validateSurname(surname)
    }


    const validateName = (name) => {
        return name !== ""
    }
    const validateSurname = (surname) => {
        return surname !== ""
    }

    return (
        <Box style={{width: "80%", marginLeft: "auto", marginRight: "auto"}}>
            <Box m={4}>
                <TextField
                    label="Name"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={({target}) => {
                        setName(target.value)
                        setShouldValidateField({...shouldValidateField, name: true})
                    }}
                    error={!validateName(name) && shouldValidateField.name}
                    helperText={!validateName(name) && shouldValidateField.name ? "Name cannot be empty" : " "}
                    disabled={loggedIn}
                />
            </Box>
            <Box m={4}>
                <TextField
                    label="Surname"
                    fullWidth
                    variant="outlined"
                    value={surname}
                    onChange={({target}) => {
                        setSurname(target.value)
                        setShouldValidateField({...shouldValidateField, surname: true})
                    }}
                    error={!validateSurname(surname) && shouldValidateField.surname}
                    helperText={!validateSurname(surname) && shouldValidateField.surname ? "Surname cannot be empty" : " "}
                    disabled={loggedIn}
                />
            </Box>
            <Box m={4}>
                <TextField
                    label="E-mail address"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={({target}) => {
                        setEmail(target.value)
                        setShouldValidateField({...shouldValidateField, email: true})
                    }}
                    error={!validateEmail(email) && shouldValidateField.email}
                    helperText={!validateEmail(email) && shouldValidateField.email ? "Email isn't valid" : " "}
                    disabled={loggedIn}
                />
            </Box>
            <Box m={4} style={{float: "right"}}>
                <input
                    onChange={({target}) => setFile(target.files[0])}
                    type="file"
                />
            </Box>
            <Button variant="outlined" onClick={apply}>
                <Typography variant="h6">
                    Apply
                </Typography>
            </Button>
        </Box>
    )
}
