import {ListWithSelection} from "../commons/layouts/ListWithSelection";
import {scrollToTop} from "../../utils/functions";

export const ApplicationsList = ({applications, onSelectedApplication}) => {

    const extractData = (application) => {
        return {
            first: `${application.jobSeeker.user.firstName} ${application.jobSeeker.user.lastName}`,
            second: application.stage.type,
            third: application.status,
            application: application
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