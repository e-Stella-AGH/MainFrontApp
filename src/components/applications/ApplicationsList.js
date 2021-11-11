import {ListWithSelection} from "../commons/layouts/ListWithSelection";
import {scrollToTop} from "../../utils/functions";

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