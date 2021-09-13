import {MarkdownEditor} from "../../../commons/MarkdownEditor";
import {FormControlLabel, Radio, RadioGroup, Typography} from "@material-ui/core";
import {useState} from "react";
import {FileUpload} from "../../../commons/FileUpload";

export const AddDescription = ({ handleChange }) => {

    const textEditor = <h1>We're sorry but this feature hasn't been implemented yet!</h1>
    const mdEditor = <MarkdownEditor handleChange={handleChange['md']} />
    const fileEditor = <FileUpload handleChange={handleChange['file']} />

    const [editor, setEditor] = useState(mdEditor)

    const handleRadioChange = ({ target }) => {
        switch (target.value) {
            case 'text':
                setEditor(textEditor)
                break;
            case 'md':
                setEditor(mdEditor)
                break;
            case 'file':
                setEditor(fileEditor)
                break;
            default:
                setEditor(null)
                break;
        }
    }

    return (
        <div>
            <Typography variant="h6">Add description to your task</Typography>
            <div style={{margin: '1em'}} />
            <div style={{display: 'flex', justifyContent: 'center', flexFlow: 'row wrap', gap: '10px', marginBottom: '1em'}}>
                <RadioGroup name="descriptionGroup" onChange={handleRadioChange} style={{display: "inline"}}>
                    <FormControlLabel value="text" control={<Radio/>} label="Text" labelPlacement="top"/>
                    <FormControlLabel value="md" control={<Radio/>} label="Markdown" labelPlacement="top"/>
                    <FormControlLabel value="file" control={<Radio/>} label="File" labelPlacement="top"/>
                </RadioGroup>
            </div>
            { editor }
        </div>
    )
}