import {ListWithSelection} from "../commons/layouts/ListWithSelection";
import {scrollToTop} from "../../utils/functions";
import {Typography} from '@material-ui/core'

export const ApplicationsList = ({applications, onSelectedApplication, forDev=false}) => {

    const extractData = (applicationData) => {

        const application = forDev ? applicationData.application : applicationData

        return {
            first: `${application.jobSeeker.user.firstName} ${application.jobSeeker.user.lastName}`,
            second: application.stage.type,
            third: application.status,
            application: applicationData
        }
    }

    const handleSelect = (application, idx) => {
        onSelectedApplication(application)
        scrollToTop()
    }

    return applications.length > 0 ?
        <ListWithSelection
            listItems={applications}
            extractData={extractData}
            limit={NaN}
            propsHandleSelect={(application, idx) => handleSelect(application.application, idx)}
            isSelectable={!!onSelectedApplication}
        />
        :
        <EmptyFilterApplicationsView />
}

const EmptyFilterApplicationsView = () => {

    return (
        <div style={{textAlign: 'center'}}>
            <img src="https://st2.depositphotos.com/3643473/6205/i/950/depositphotos_62059839-stock-photo-person-and-question-marks.jpg" alt="Person with question marks around head" style={{width: '80%', marginBottom: '1em'}} />
            <Typography variant="h5" color="textSecondary">Oh no, your filters are too specific! Try to remove some of them</Typography>
        </div>
    )
}