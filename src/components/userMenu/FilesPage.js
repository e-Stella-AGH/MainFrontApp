import {jobSeekerAPI} from "../../utils/apis/JobSeekerAPI";
import React, {useCallback, useEffect, useState} from "react";
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

function _arrayBufferToBase64( buffer ) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}


function handleDownload(fileName, base64) {
    const url = window.URL.createObjectURL(new Blob([_base64ToArrayBuffer(base64)]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
}

const FileDownloadButton = ({index, fileName, base64}) =>
    <Grid item xs={12} key={index}>
        <Paper style={{padding: "5px", paddingLeft: "1em", backgroundColor: "primary", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            {fileName}
            <IconButton
                aria-controls="download-button"
                aria-haspopup="true"
                onClick={() => handleDownload(fileName, base64)}
            >
                <Save />
            </IconButton>
        </Paper>
    </Grid>

const FilesDropzone = ({onDrop}) => {
    const {isDragActive, getRootProps, getInputProps} = useDropzone({onDrop})
    const color = isDragActive ? "grey" : "lightgrey"
    return <Paper style={{
        padding: "2em",
        paddingTop: "4em",
        paddingBottom: "4em",
        backgroundColor: color,
        justifyContent: "center",
        display: "flex"
    }} {...getRootProps()}>
        <input {...getInputProps()} />
        {
            isDragActive ?
                <p>Drop files here...</p> :
                <p>Drag and drop files here, or click to select them</p>
        }
    </Paper>
}

export const FilesPage = () => {
    const [files, setFiles] = useState([])
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.map(value => {
            return value.arrayBuffer().then(
                arrayBuffer =>
                    jobSeekerAPI.insertFile({
                        fileName: value.name,
                        file_base64: _arrayBufferToBase64(arrayBuffer)
                    }).then(() => {
                        jobSeekerAPI.getFiles().then(a => setFiles(a))
                    })
            )
        })
    }, [])

    useEffect(
        () => {
            jobSeekerAPI.getFiles().then(a => setFiles(a))
        },
    []
    )

    return <div>
        <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
                <FilesDropzone onDrop={onDrop} />
            </Grid>
            <Grid container item md={6} xs={12} spacing={2}>
                {files.map((value, index) =>
                    <FileDownloadButton index={index} fileName={value.fileName} base64={value.fileBase64} />
                )}
            </Grid>
        </Grid>
    </div>
}
