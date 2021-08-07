import {useParams} from "react-router-dom";
import {StandardViewAndFilterLayout} from "../commons/StandardViewAndFilterLayout";
import {ColumnAndDetailsLayout} from "../commons/ColumnAndDetailsLayout";
import {ApplicationsList} from "./ApplicationsList";
import {useEffect, useState} from "react";
import {applicationsAPI} from "../../utils/apis/applicationsAPI";
import {ApplicationDetails} from "./ApplicationDetails";

export const ApplicationsView = ({ getApplications, getProcess, isHR }) => {

    const { id } = useParams()

    const [selectedApplication, setSelectedApplication] = useState(null)
    const [applications, setApplications] = useState([])
    const [process, setProcess] = useState(null)

    useEffect(() => {
        getApplications(id)
            .then(data => setApplications(data))
        getProcess(id)
            .then(data => setProcess(data))
    }, [getApplications, getProcess, id])

    return (
        <>
            <StandardViewAndFilterLayout
                filter={null}
                sorter={null}
                view={
                    <ColumnAndDetailsLayout
                        details={selectedApplication ? <ApplicationDetails application={selectedApplication} process={process} isHR={isHR}/> : <div>Select application</div>}
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