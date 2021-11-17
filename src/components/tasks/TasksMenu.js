export const TasksMenu = ({ tasks, key_uuid, uuid }) => {

    return (
        <div style={{padding: '1em', marginLeft: '5em'}}>
            {key_uuid}: {uuid}
        </div>
    )
}