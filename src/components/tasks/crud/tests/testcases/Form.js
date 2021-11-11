import {IconButton, TextField} from "@material-ui/core";
import {useState} from "react";
import {AddCircleOutlined} from "@material-ui/icons";

export const Form = ({ addTestCase }) => {

    const [testCase, setTestCase] = useState({})

    const addTestCaseAndClearFields = () => {
        addTestCase(testCase)
        setTestCase({})
    }

    return (
        <div style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'center', gap: '2em'}}>
            <TextField
                label="Input"
                variant="outlined"
                value={testCase?.input}
                onChange={({ target }) => setTestCase({...testCase, input: target.value})}
            />
            <TextField
                label="Expected Output"
                variant="outlined"
                value={testCase?.output}
                onChange={({ target }) => setTestCase({...testCase, output: target.value})}
            />
            <IconButton onClick={() => {
                addTestCaseAndClearFields(testCase)
                setTestCase({})
            }}>
                <AddCircleOutlined fontSize="large" color="primary" />
            </IconButton>
        </div>
    )
}