import {jobSeekerAPI} from "../../utils/apis/JobSeekerAPI";
import React, {useCallback, useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import {DeleteForever, Save} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import {useDropzone} from "react-dropzone";

function _base64ToArrayBuffer(base64) {
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

const FileCard = ({file, handleDownload, handleDelete}) =>
    <Grid item xs={12} style={{marginBottom: "15px"}}>
        <Paper style={{padding: "5px", paddingLeft: "1em", backgroundColor: "primary", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            {file.fileName}
            <div>
                <IconButton
                    onClick={() => handleDownload(file.fileName, file.fileBase64)}
                >
                    <Save />
                </IconButton>
                <IconButton
                    onClick={() => handleDelete(file.id)}
                >
                    <DeleteForever />
                </IconButton>
            </div>
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

    const fetchFiles = () => jobSeekerAPI.getFiles().then(a => setFiles(a))

    const onDrop = useCallback(acceptedFiles => {
        Promise.all(acceptedFiles.map(value =>
            value.arrayBuffer().then(
                arrayBuffer => { return {
                    fileName: value.name,
                    fileBase64: _arrayBufferToBase64(arrayBuffer)
                }}
            )
        )).then(files => jobSeekerAPI.insertFiles(files)).then(fetchFiles)
    }, [])

    useEffect(
        fetchFiles,
    []
    )

    function handleDownload(fileName, base64) {
        const url = window.URL.createObjectURL(new Blob([_base64ToArrayBuffer(base64)]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    }

    function handleDelete(id) {
        jobSeekerAPI.deleteFile(id).then(fetchFiles)
    }

    return <div>
        <Grid container spacing={2}>
            <Grid item lg={files.length ? 6 : 12} xs={12}>
                <FilesDropzone onDrop={onDrop} />
            </Grid>
            <Grid container item lg={6} xs={12}>
                {files.map((value, index) =>
                    <FileCard key={index} file={value} handleDownload={handleDownload} handleDelete={handleDelete} />
                )}
            </Grid>
        </Grid>
    </div>
}
