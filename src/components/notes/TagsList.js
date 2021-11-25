import {Chip} from '@material-ui/core';
import {Typography} from '@material-ui/core';

export const TagsList = ({ tags, deletable = false, onDelete = () => {} }) => {

    const makeTag = (tag, idx) => {
        const props = deletable ? {onDelete: () => onDelete(tag)} : {}
        return (<Chip style={{margin: '10px'}} key={idx} label={tag} variant="outlined" color="primary" {...props} />)
    }

    return (
        <div style={{display: 'flex', overflow: 'scroll'}}>
            { tags.length > 0 ? tags.map((tag, idx) => makeTag(tag, idx)) : <Typography variant="body1">You haven't added any tags yet</Typography>}
        </div>
    )
}