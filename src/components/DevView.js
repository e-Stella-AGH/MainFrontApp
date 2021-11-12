import {useState} from 'react'
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {TasksList} from './tasks/crud/TasksList';
import { ApplicationsView } from './applications/ApplicationsView'

export const DevView = ({ fetchTasks, getApplications, id, mailInBase64 }) => {

    const [view, setView] = useState('edit')

    const getView = () => {
        if (view === 'edit') {
            return (
                <TasksList
                    fetchTasks={fetchTasks}
                    organizationId={id}
                />
            )
        } else if (view === 'assign') {
            return (
                <ApplicationsView
                    isHR={false}
                    isDev={true}
                    getApplications={getApplications}
                    mailInBase64={mailInBase64}
                />
            )
        } else return null
    }

    return (
    <div>
        <div style={{marginLeft: '10%'}}>
            {getView()}
        </div>
        <Drawer
            open
            variant="permanent"
        >
            <List style={{marginTop: '5em'}}>
                <ListItem button onClick={() => setView('edit')}>
                    <ListItemIcon>
                        <EditIcon size="large" color="action" />
                    </ListItemIcon>
                    <ListItemText primary="Edit Tasks" />
                </ListItem>
                <ListItem button onClick={() => setView('assign')}>
                    <ListItemIcon>
                        <AssignmentIcon size="large" color="action" />
                    </ListItemIcon>
                    <ListItemText primary="Assign Task" />
                </ListItem>
            </List>
        </Drawer>
    </div>
    )
}