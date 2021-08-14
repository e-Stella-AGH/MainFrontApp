import {Modal} from "@material-ui/core";
import PropTypes from "prop-types";

export const FileViewer = ({file, open, handleClose}) => {

    const getData = () => {
        return `data:application/pdf;base64,${file?.fileBase64}`
    }

    return (
        <Modal open={open}
               onClose={handleClose}
        >
            <div style={{marginLeft: "auto", marginRight: "auto", width: "80%", height: "90%", marginTop: "2em"}}>
                <iframe title="File" src={getData()} height="100%" width="100%"/>
            </div>
        </Modal>
    )
}

FileViewer.propTypes = {
    file: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}