import Swal from "sweetalert2";
import {useParams} from "react-router-dom";
import {Button, TextField} from "@material-ui/core";
import React, {useCallback, useEffect, useState} from "react";
import {offersAPI} from "../../../utils/apis/OfferApi";
import {validateEmail} from "../../../utils/functions";
import {useLoggedIn} from "../../../utils/hooks/useLoggedIn";
import {jwtUtils} from "../../../utils/jwt/jwtUtils";
import {withSwal} from "../../commons/formsCommons/WithSwal";
import IconButton from "@material-ui/core/IconButton";
import {DeleteForeverOutlined} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FilesDropzone from "../../userMenu/FilesDropzone";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import {jobSeekerAPI} from "../../../utils/apis/JobSeekerAPI";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    }
}));

function _arrayBufferToBase64( buffer ) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

const SelectSavedFile = ({files, onSave, open, setOpen}) => {
    const [file, setFile] = useState(null)

    const classes = useStyles()

    const handleChange = (event) => {
        setFile(event.target.value)
    }

    const handleClose = () => {
        setFile(null)
        setOpen(false)
    }

    const handleSave = () => {
        onSave(file)
        setFile(null)
        setOpen(false)
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Select file to attach</DialogTitle>
                <DialogContent>
                    <form>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-dialog-select-label">File</InputLabel>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={file}
                                onChange={handleChange}
                            >
                                <MenuItem value={null}>
                                    <em>None</em>
                                </MenuItem>
                                {files.map(file => <MenuItem value={file}>{file.fileName}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" disabled={file == null}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const FileCard = ({file, index, handleDelete}) => {
    return <Paper style={{
        padding: "5px",
        paddingLeft: "1em",
        backgroundColor: "primary",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }}>
        {file.fileName}
        <div>
            <IconButton
                onClick={() => handleDelete(index)}
            >
                <DeleteForeverOutlined/>
            </IconButton>
        </div>
    </Paper>
}

export const ApplyForm = () => {

    const {id} = useParams()

    const {loggedIn} = useLoggedIn()
    const user = jwtUtils.getUser()

    const [name, setName] = useState(user?.firstName || "")
    const [surname, setSurname] = useState(user?.lastName || "")
    const [email, setEmail] = useState(user?.mail || "")
    const [files, setFiles] = useState([])
    const [loadedFiles, setLoadedFiles] = useState([])
    const [open, setOpen] = useState(false)

    const [shouldValidateField, setShouldValidateField] = useState({
        name: false,
        surname: false,
        email: false
    })

    useEffect(() => {
        if(loggedIn)
            jobSeekerAPI.getFiles().then(files => {
                setLoadedFiles(files)
            })
    }, [])

    const apply = () => {
        if (validate()) {
            if (files === []) {
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
                validatedApply(files)
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
            promise: () => loggedIn ? offersAPI.applyWithUser(id, files) : offersAPI.applyWithNoUser(id, name, surname, email, files),
            successSwalTitle: "Success",
            successSwalText: "You've successfully applied for this offer!",
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

    const onDrop = useCallback(acceptedFiles => {
        Promise.all(acceptedFiles.map(value =>
            value.arrayBuffer().then(
                arrayBuffer => { return {
                    fileName: value.name,
                    fileBase64: _arrayBufferToBase64(arrayBuffer)
                }}
            )
        )).then(newFiles => {
            setFiles(oldFiles => oldFiles.concat(newFiles))
        })
    }, [])

    const handleDeleteFile = (index) => {
        setFiles(oldFiles => oldFiles.filter((_, ind) => index !== ind))
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const onAttachFile = (newFile) => {
        setFiles(oldFiles => oldFiles.concat([newFile]))
    }

    return (
        <Grid container spacing={1} style={{width: "80%", marginLeft: "auto", marginRight: "auto"}}>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12} md={loadedFiles.length !== 0 ? 6 : 12}>
                <FilesDropzone onDrop={onDrop} />
            </Grid>
            {loadedFiles.length !== 0 && <Grid item xs={12} md={6}>
                <Button style={{height: "100%"}}
                        variant="contained"
                        size="large"
                        color="secondary"
                        onClick={handleClickOpen}
                        fullWidth>
                    Attach saved file
                </Button>
                <SelectSavedFile files={loadedFiles} open={open} setOpen={setOpen} onSave={file => onAttachFile(file)} />
            </Grid>}
            {files.map((file, ind) => <Grid item xs={12} md={6} style={{marginBottom: "15px"}}>
                <FileCard file={file} index={ind} handleDelete={handleDeleteFile} />
            </Grid>)}
            <Grid item xs={12}>
                <Button variant="contained"
                        size="large"
                        color="primary"
                        onClick={apply}
                        fullWidth>
                    Apply
                </Button>
            </Grid>
        </Grid>
    )
}
