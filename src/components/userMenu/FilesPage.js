import {jobSeekerAPI} from "../../utils/apis/JobSeekerAPI";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import {Save} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import {useDropzone} from "react-dropzone";

function _base64ToArrayBuffer(base64) {
    console.log(base64)
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
}

function handleDownload(fileName, base64) {
    const url = window.URL.createObjectURL(new Blob([_base64ToArrayBuffer(base64)]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
}

export const FilesPage = () => {
    const [files, setFiles] = useState([])
    const fileRef = useRef(null)
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    useEffect(
        () => {
            jobSeekerAPI.getFiles().then(a => setFiles(a))
        },
    []
    )

    const color = isDragActive ? "grey" : "lightgrey"

    return <div>
        <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
                <Paper style={{padding: "2em", backgroundColor: color, justifyContent: "center", display: "flex"}} {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </Paper>
            </Grid>
            <Grid item md={6} xs={12}>
                {files.map(value => {
                    return <Paper style={{padding: "5px", paddingLeft: "1em", backgroundColor: "primary", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        {value.fileName}
                        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={() => handleDownload(value.fileName, value.fileBase64)}>
                            <Save />
                        </IconButton>
                    </Paper>
                })}
            </Grid>
        </Grid>
    </div>
}
