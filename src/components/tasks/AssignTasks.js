import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, Button, Typography, GridList, GridListTile } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Task } from './crud/Task'
import { tasksApi } from '../../utils/apis/tasksAPI'
import { useDevPassword } from '../../utils/hooks/useDevPassword'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    paper: {
      position: 'absolute',
      width: '50%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }


export const AssignTasks = ({ modalOptions, alreadyAssignedTasks, organizationTasks, setReload, assignKey, assignUUIDValue }) => {

    const classes = useStyles()
    const {getEncoded} = useDevPassword()

    const onAssign = (task) => {
        const tasksIds = alreadyAssignedTasks.map(assignedTask => assignedTask.id)
        tasksApi.assignTasks([...tasksIds, task.id], getEncoded(), setReload, assignKey, assignUUIDValue)
    }

    return (
        <Modal
            open={modalOptions.open}
            onClose={modalOptions.onClose}
            className={classes.modal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            style={{zIndex: 1000}}
        >
            <Fade in={modalOptions.open}>
                <div className={classes.paper} style={getModalStyle()}>
                    
                    <Section title="Tasks you've already assigned:" tasks={alreadyAssignedTasks} empty="No one have assign any tasks for this application" />
                    <Divider style={{margin: '1em 0'}} />
                    <Section title="Tasks you can assign:" tasks={organizationTasks} empty="Your organization doesn't have any task." forAssign onAssign={onAssign} />

                    <ModalButtons handleClose={modalOptions.handleClose} />
                </div>
            </Fade>
        </Modal>
    )

}

AssignTasks.propTypes = {
    modalOptions: PropTypes.exact({
        open: PropTypes.bool.isRequired,
        handleClose: PropTypes.func.isRequired
    })
}

const ModalButtons = ({ handleClose }) => {

    return (<Grid container direction="row">
                <Grid item xs={5}>
                    <Typography color="textSecondary">To assign task, expand menu and click "Assign"</Typography>
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={5}>
                    <Button variant="contained" color="primary" onClick={handleClose} fullWidth>Job Done!</Button>
                </Grid>
            </Grid>)
}

const Section = ({ title, tasks, empty, onAssign, forAssign }) => {

    return (<div style={{margin: '1em 0', overflow: 'hidden', width: '100%'}}>
        <Typography variant="h6" color="textSecondary" style={{marginBottom: '5px'}}>{title}</Typography>
            {
                tasks?.length > 0 ?
                    <GridList style={{flexWrap: 'nowrap'}} cols={2.5}>
                        {tasks.map((task, idx) => <GridListTile key={task}><Task task={task} forAssign={forAssign} tasksOperations={[{ title: "Assign", action: () => onAssign(task) }]} /></GridListTile>)}
                    </GridList> :
                    <Typography>{empty}</Typography>
            }
    </div>)
}