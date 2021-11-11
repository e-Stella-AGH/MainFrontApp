import {ListWithSelection} from "../commons/layouts/ListWithSelection";
import {scrollToTop} from "../../utils/functions";

<<<<<<< HEAD
export const ApplicationsList = ({applications, onSelectedApplication, forDev=false}) => {

    const extractData = (applicationData) => {

        const application = forDev ? applicationData.application : applicationData

=======
export const ApplicationsList = ({applications, onSelectedApplication}) => {

    const extractData = (application) => {
>>>>>>> c40b8f71775e5d0779e41986e4331bcbb51ac488
        return {
            first: `${application.jobSeeker.user.firstName} ${application.jobSeeker.user.lastName}`,
            second: application.stage.type,
            third: application.status,
<<<<<<< HEAD
            application: applicationData
=======
            application: application
>>>>>>> c40b8f71775e5d0779e41986e4331bcbb51ac488
        }
    }

    const handleSelect = (application, idx) => {
        onSelectedApplication(application)
        scrollToTop()
    }

    return (
        <ListWithSelection
            listItems={applications}
            extractData={extractData}
            limit={NaN}
            propsHandleSelect={(application, idx) => handleSelect(application.application, idx)}
            isSelectable={!!onSelectedApplication}
        />
    )
}