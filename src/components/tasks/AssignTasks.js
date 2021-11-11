import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, Button, Typography } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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

  //On top there's a list with already assigned tasks, on bottom - available tasks with autocomplete for search with titles.


export const AssignTasks = ({ modalOptions, alreadyAssignedTasks, organizationTasks }) => {

    const classes = useStyles()

    console.log(alreadyAssignedTasks)
    console.log(organizationTasks)

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
        >
            <Fade in={modalOptions.open}>
                <div className={classes.paper} style={getModalStyle()}>
                    
                    <Section title="Tasks you've already assigned:" />
                    <Divider style={{margin: '1em 0'}} />
                    <Section title="Tasks you can assign:" />

                    <ModalButtons assign={() => alert('xd')} handleClose={modalOptions.handleClose} />
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

const ModalButtons = ({ handleClose, assign }) => {

    return (<Grid container direction="row">
                <Grid item xs={5}>
                    <Button onClick={handleClose} fullWidth>Cancel</Button>
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={5}>
                    <Button variant="contained" color="primary" onClick={assign} fullWidth>Assign</Button>
                </Grid>
            </Grid>)
}

const Section = ({ title, tasks }) => {

    return (<div style={{margin: '1em 0'}}>
        <Typography variant="h6" color="textSecondary">{title}</Typography>
    </div>)
}