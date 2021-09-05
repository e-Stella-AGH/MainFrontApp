export const FileUpload = ({ handleChange }) => {

    return (
        <label style={{border: `1px solid #ccc`, display: 'inline-block', padding: `6px 12px`, cursor: 'pointer', width: '80%'}}>
            <input type="file" onChange={({ target }) => handleChange(target.files[0])} style={{display: 'none'}} />
            Upload File!
        </label>
    )
}