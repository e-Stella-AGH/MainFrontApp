import MarkdownIt from "markdown-it";

const mdParser = new MarkdownIt()

export const MarkdownViewer = ({ markdown }) => {

    let parsed = mdParser.render(markdown)

    return (
        <div dangerouslySetInnerHTML={{__html:parsed}} />
    )
}