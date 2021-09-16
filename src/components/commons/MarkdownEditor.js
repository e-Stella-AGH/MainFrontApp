import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt()

export const MarkdownEditor = ({ style, handleChange }) => {

    return (
        <MdEditor style={style || { height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleChange} />
    )
}
