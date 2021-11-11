import {useState, useEffect} from "react";
import {Form} from "./Form";
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export const ManualTestsCases = ({ handleSubmit }) => {

    const [testCases, setTestCases] = useState([])

    useEffect(() => {
        console.log(testCases)
        handleSubmit(testCases)
    }, [testCases])

    const handleAddTestCase = (testCase) => {
        const preparedTestCase = {
            testData: testCase.input,
            expectedResult: testCase.output,
            testCaseId: testCases.length === 0 ? 1 : testCases[testCases.length - 1].testCaseId + 1
        }
        setTestCases(testCases => [
            ...testCases,
            preparedTestCase
        ])
    }

    const handleDelete = (testCase) => {
        setTestCases( testCases => 
            testCases.filter(test => test.testCaseId !== testCase.testCaseId)
        )
    }

    return (
        <div style={{maxHeight: '70vh', overflow: 'scroll'}}>
            <Form addTestCase={(testCase) => handleAddTestCase(testCase)} />
            <TableContainer component={Paper} style={{marginTop: '5px'}}>
                <Table>
                    <TableHead>
                      <TableRow>
                          <TableCell>Test Case Id</TableCell>
                          <TableCell>Input</TableCell>
                          <TableCell>Expected Output</TableCell>
                          <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        {testCases.map(testCase => (
                            <TableRow key={testCase.testCaseId}>
                                <TableCell align="left">{testCase.testCaseId}.</TableCell>
                                <TableCell align="left">{testCase.testData}</TableCell>
                                <TableCell align="left">{testCase.expectedResult}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleDelete(testCase)}>
                                        <DeleteIcon fontSize="large" color="primary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}