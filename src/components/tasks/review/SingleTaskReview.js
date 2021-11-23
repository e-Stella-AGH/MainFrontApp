import MonacoEditor from 'react-monaco-editor';
import {decodeBase64} from '../../../utils/hooks/Base64';
import {MarkdownViewer} from '../../commons/MarkdownViewer';
import {Card, Typography} from '@material-ui/core'
import { useState, useRef, useEffect } from 'react'
import {SingleTestCase} from './SingleTestCase'
import {SingleResult} from './SingleResult'

export const SingleTaskReview = ({ task }) => {
    const { code, results, tests, description } = task

    const decodedResults = JSON.parse(decodeBase64(decodeBase64(results)))
    const decodedTestCases = JSON.parse(decodeBase64(tests))

    const [height, setHeight] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setHeight(ref.current.clientHeight)
    })

    return (
        <div>
            <div style={{textAlign: 'left', display: 'flex', flexDirection: 'row', width: "100%", height: "40%"}}>
                <MonacoEditor
                    value={decodeBase64(code)}
                    theme="vs-dark"
                    language="plain-text"
                    width="100%"
                    height={`${height+2}px`}
                    options={{readOnly: true}}
                />
                <Card style={{ padding: '1em', width: '100%' }} variant="outlined" ref={ref}>
                    <MarkdownViewer markdown={decodeBase64(description)} />
                </Card>
            </div>
            <div style={{textAlign: 'left', display: 'flex', flexDirection: 'row', marginTop: '2em', justifyContent: 'space-between'}}>
                <Card style={{ padding: '1em', width: "40%", maxHeight: '40vh', overflow: 'scroll' }} variant="outlined">
                    <Typography variant="h6">Test Cases:</Typography>
                    {decodedTestCases.map((testCase, idx) => (<SingleTestCase key={idx} testCase={testCase}/>))}
                </Card>
                <Card style={{ padding: '1em', width: "40%", maxHeight: '40vh', overflow: 'scroll' }} variant="outlined">
                    <Typography variant="h6">Results:</Typography>
                    {decodedResults.map((result, idx) => (<SingleResult key={idx} result={result} />))}
                </Card>
            </div>
        </div>
    )
}