import PropTypes from 'prop-types'
import {makeStyles, Modal} from "@material-ui/core";
import {useEffect, useState} from "react";
import {b64toBlob} from "../../utils/apis/files";
import {MarkdownViewer} from "./MarkdownViewer";

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export const GenericFileViewer = ({ file, open, handleClose }) => {

    const classes = useStyles()

    const [txt, setTxt] = useState(null)

    useEffect(() => {
        if(file?.fileName?.indexOf('txt') !== -1) {
            new File([b64toBlob(file.fileBase64)], file.fileName).text()
                .then(result => setTxt(result))
        }
    }, [file])

    const decodeFile = () => {
        return atob(file.fileBase64)
    }

    const getViewer = () => {
        switch (true) {
            case file.fileName.indexOf('md') !== -1:
                return <MarkdownViewer markdown={decodeFile()} />
            case file?.fileName?.indexOf('pdf') !== -1:
                return <iframe title="File" src={`data:application/pdf;base64,${file?.fileBase64}`} height="100%" width="100%"/>
            case file?.fileName?.indexOf('txt') !== -1:
                return txt
            default:
                return null
        }
    }

    return (
        <Modal open={open}
               onClose={handleClose}
        >
            <div style={{marginLeft: "auto", marginRight: "auto", width: "50%", height: "60%", marginTop: "5em"}} className={classes.paper}>
                {open && getViewer()}
            </div>
        </Modal>
    )
}

GenericFileViewer.propTypes = {
    file: PropTypes.shape({
        fileName: PropTypes.string.isRequired,
        fileBase64: PropTypes.string.isRequired
    })
}