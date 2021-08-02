import Swal from "sweetalert2";
import {useParams} from "react-router-dom";
import {Box, Button, TextField, Typography} from "@material-ui/core";
import {useState} from "react";
import {offersAPI} from "../../../utils/apis/OfferApi";
import {validateEmail} from "../../../utils/functions";

export const ApplyForm = () => {

    const {id} = useParams()
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
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
            } else{
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
        let swal = new Swal({
            title: "Applying"
        })
        Swal.showLoading()
        offersAPI.applyWithNoUser(id, name, surname, email, files)
            .then((result) => {
                if(!result.ok) throw Error("Something went wrong!")
                swal.close()
                Swal.fire({
                    title: "Success",
                    text: "You've successfully applied to this offer!",
                    icon: "success"
                })
            })
            .catch((err) => {
                swal.close()
                Swal.fire({
                    title: err,
                    text: "We couldn't apply you on this offer",
                    icon: "error",
                    confirmButtonText: "ok"
                })
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
