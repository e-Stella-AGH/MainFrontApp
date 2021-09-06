import {useState} from "react";

export const FileUpload = ({handleChange}) => {

    const [uploaded, setUploaded] = useState(false)

    return (
        <label style={{
            border: `1px solid #ccc`,
            display: 'inline-block',
            padding: `6px 12px`,
            cursor: 'pointer',
            width: '80%'
        }}>
            <input type="file" onChange={({target}) => {
                setUploaded(true);
                handleChange(target.files[0])
            }} style={{display: 'none'}}/>
            {!uploaded ? "Upload File!" : "Done!"}
        </label>
    )
}