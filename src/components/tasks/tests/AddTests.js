import {FileUpload} from "../../commons/FileUpload";
import {FormControlLabel, Radio, RadioGroup, Typography} from "@material-ui/core";
import {useState} from "react";
import {ManualTestsCases} from "./Manual";

export const AddTests = ({ handleChange }) => {

    const [view, setView] = useState(null)

    const fileUploader = <FileUpload handleChange={handleChange['file']}/>
    const manualView = <ManualTestsCases handleSubmit={handleChange['manual']} />

    const handleRadioChange = ({target}) => {
        switch (target.value) {
            case 'manually':
                setView(manualView)
                break;
            case 'file':
                setView(fileUploader)
                break;
            default:
                setView(null)
                break;
        }
    }

    return (
        <div>
            <Typography variant="h6">Add tests for your task</Typography>
            <Typography variant="subtitle1">Remember to set expected value as String, as our code checker will evaluate
                result of code to String</Typography>
            <div style={{margin: '1em'}}/>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexFlow: 'row wrap',
                gap: '10px',
                marginBottom: '1em'
            }}>
                <RadioGroup name="descriptionGroup" onChange={handleRadioChange} style={{display: "inline"}}>
                    <FormControlLabel value="manually" control={<Radio/>} label="Manual" labelPlacement="top"/>
                    <FormControlLabel value="file" control={<Radio/>} label="File" labelPlacement="top"/>
                </RadioGroup>
            </div>
            {view}
        </div>
    )
}