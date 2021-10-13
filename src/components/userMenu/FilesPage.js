import {jobSeekerAPI} from "../../utils/apis/JobSeekerAPI";
import React, {useCallback, useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import {DeleteForeverOutlined, GetAppOutlined} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import {Button, Typography} from "@material-ui/core";
import {withSwal} from "../commons/formsCommons/WithSwal";
import deepOrange from "@material-ui/core/colors/deepOrange";
import Box from "@material-ui/core/Box";
import FilesDropzone from "./FilesDropzone";

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

const FilesChangedTip = ({onSaveFiles}) =>
    <Paper elevation={0} variant="outlined" style={{
        padding: "1em",
        paddingLeft: "1em",
        backgroundColor: deepOrange[100],
        display: "flex"
    }}>
        <Grid container>
            <Grid item xs={12} md={9} lg={12}>
                <Box
                    display="flex"
                    alignItems="center"
                    height="100%"
                >
                    <Typography>Click "Save files" in order to save your changes</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={3} lg={12}>
                <Button fullWidth variant="contained" color="primary" onClick={onSaveFiles}>Save files</Button>
            </Grid>
        </Grid>
    </Paper>

const OldFilePaper = ({children}) =>
    <Paper style={{
        padding: "5px",
        paddingLeft: "1em",
        backgroundColor: "primary",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }}>
        {children}
    </Paper>


const NewFilePaper = ({children}) =>
    <Paper style={{
        padding: "5px",
        paddingLeft: "1em",
        backgroundColor: "orange",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }}>
        {children}
    </Paper>

const FileCard = ({file, index, initialFiles, handleDownload, handleDelete}) => {
    const ch = <>
        {file.fileName}
        <div>
            <IconButton
                onClick={() => handleDownload(file.fileName, file.fileBase64)}
            >
                <GetAppOutlined/>
            </IconButton>
            <IconButton
                onClick={() => handleDelete(index)}
            >
                <DeleteForeverOutlined/>
            </IconButton>
        </div>
    </>
    return <Grid item xs={12} style={{marginBottom: "15px"}}>
        {initialFiles.some(a => a.id === file.id) ?
            <OldFilePaper>{ch}</OldFilePaper>:
            <NewFilePaper>{ch}</NewFilePaper>}
    </Grid>
}

export const FilesPage = () => {
    const [downloadedFiles, setDownloadedFiles] = useState([])
    const [files, setFiles] = useState([])


    const downloadedFilesSet = new Set(downloadedFiles)
    const filesSet = new Set(files)

    const filesChanged = downloadedFiles.some(df => !filesSet.has(df)) || files.some(f => !downloadedFilesSet.has(f))

    const fetchFiles = () => jobSeekerAPI.getFiles().then(f => {
        f.sort((a, b) => a.id - b.id)
        setDownloadedFiles(f)
        setFiles(f)
    })

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

    function handleDelete(index) {
        setFiles(oldFiles => oldFiles.filter((_, ind) => index !== ind))
    }

    function onSaveFiles() {
        withSwal({
            title: "Saving files",
            promise: () => jobSeekerAPI.insertFiles(files),
            successSwalTitle: "Success",
            successSwalText: "You've successfully saved your files!",
            errorSwalTitle: "Something went wrong",
            errorSwalText: "We couldn't save these files for you",
            successFunction: fetchFiles
        })
    }

    return <div>
        <Grid container spacing={2}>
            <Grid item lg={files.length ? 6 : 12} xs={12}>
                <FilesDropzone onDrop={onDrop} />
            </Grid>
            <Grid container item lg={files.length ? 6 : false} xs={12}>
                <Grid item xs={12} style={{marginBottom: "15px"}}>
                    {filesChanged && <FilesChangedTip onSaveFiles={onSaveFiles}/>}
                </Grid>
                {files.map((value, index) =>
                    <FileCard key={index} index={index} file={value} initialFiles={downloadedFiles} handleDownload={handleDownload} handleDelete={handleDelete} />
                )}
            </Grid>
            <Grid item xs={false} md={6} lg={10} />
            <Grid item xs={12} md={6} lg={2}>
            </Grid>
        </Grid>
    </div>
}
