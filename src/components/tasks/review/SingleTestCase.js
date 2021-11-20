import {Card, Typography} from '@material-ui/core';

export const SingleTestCase = ({ testCase }) => {

    return (
        <Card style={{margin: '1em 0', padding: '1em', height: '8vh'}}>
            <Typography variant="body1">
                Test Data: {testCase?.testData} <br />
                Expected Result: {testCase?.expectedResult}
            </Typography>
        </Card>
    )
}