import {useParams} from "react-router-dom";
import {StandardViewAndFilterLayout} from "../commons/StandardViewAndFilterLayout";
import {ColumnAndDetailsLayout} from "../commons/ColumnAndDetailsLayout";
import {ApplicationsList} from "./ApplicationsList";
import {useEffect, useState} from "react";
import {applicationsAPI} from "../../utils/apis/applicationsAPI";
import {ApplicationDetails} from "./ApplicationDetails";
import {processAPI} from "../../utils/apis/ProcessAPI";

export const ApplicationsView = () => {

    const { offerId } = useParams()

    const [selectedApplication, setSelectedApplication] = useState(null)
    const [applications, setApplications] = useState([])
    const [process, setProcess] = useState(null)

    useEffect(() => {
        applicationsAPI.getApplicationsByOfferId(offerId)
            .then(data => setApplications(data))
        processAPI.getProcessById(offerId)
            .then(data => setProcess(data))
    }, [offerId])

    return (
        <>
            <StandardViewAndFilterLayout
                filter={null}
                sorter={null}
                view={
                    <ColumnAndDetailsLayout
                        details={selectedApplication ? <ApplicationDetails application={selectedApplication} process={process}/> : <div>Select application</div>}
                        list={<ApplicationsList
                            applications={applications}
                            onSelectedApplication={selected => setSelectedApplication(selected)}
                        />}
                    />
                }
            />
        </>
    )
}