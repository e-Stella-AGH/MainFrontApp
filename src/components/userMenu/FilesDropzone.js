import {useDropzone} from "react-dropzone";
import Paper from "@material-ui/core/Paper";
import React from "react";

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

export default FilesDropzone