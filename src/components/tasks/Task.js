import {Card, CardContent} from "@material-ui/core";

export const Task = ({ task }) => {

    return (
        <Card style={{padding: '1em', margin: '1em'}}>
            <CardContent>
                {task.id}
            </CardContent>
        </Card>
    )
}