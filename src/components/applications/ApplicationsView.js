import {useParams} from "react-router-dom";
import {StandardViewAndFilterLayout} from "../commons/StandardViewAndFilterLayout";
import {ColumnAndDetailsLayout} from "../commons/ColumnAndDetailsLayout";
import {ApplicationsList} from "./ApplicationsList";
import {useEffect, useState} from "react";
import {applicationsAPI} from "../../utils/apis/applicationsAPI";
import {ApplicationDetails} from "./ApplicationDetails";

export const ApplicationsView = () => {

    const { offerId } = useParams()

    const [selectedApplication, setSelectedApplication] = useState(null)
    const [applications, setApplications] = useState([])

    useEffect(() => {
        applicationsAPI.getApplicationsByOfferId(offerId)
            .then(data => setApplications(data))
    }, [offerId])

    return (
        <>
            <StandardViewAndFilterLayout
                filter={null}
                sorter={null}
                view={
                    <ColumnAndDetailsLayout
                        details={<ApplicationDetails application={selectedApplication}/>}
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