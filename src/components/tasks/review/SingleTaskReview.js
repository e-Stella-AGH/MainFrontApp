import MonacoEditor from 'react-monaco-editor';
import {decodeBase64} from '../../../utils/hooks/Base64';
import {MarkdownViewer} from '../../commons/MarkdownViewer';
import {Card} from '@material-ui/core'

export const SingleTaskReview = ({ task }) => {
    const { code, results, tests, description } = task

    return (
        <div>
            <div style={{textAlign: 'left', display: 'flex', flexDirection: 'row', gap: '1em'}}>
                <MonacoEditor
                    value={code}
                    theme="vs-dark"
                    language="plain-text"
                    width="100%"
                    height="40vh"
                    options={{readOnly: true}}
                />
                <div style={{border: '1px solid #989898', padding: '1em', width: '100%'}}>
                    <MarkdownViewer markdown={decodeBase64(description)} />
                </div>
            </div>
            <Card>

            </Card>
        </div>
    )
}