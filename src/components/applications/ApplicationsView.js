import {useParams} from "react-router-dom";
import {StandardViewAndFilterLayout} from "../commons/StandardViewAndFilterLayout";
import {ColumnAndDetailsLayout} from "../commons/ColumnAndDetailsLayout";
import {ApplicationsList} from "./ApplicationsList";
import {useEffect, useState} from "react";
import {applicationsAPI} from "../../utils/apis/applicationsAPI";
import {ApplicationDetails} from "./ApplicationDetails";

export const ApplicationsView = ({getApplications, isHR}) => {

    const {id} = useParams()

    const [selectedApplication, setSelectedApplication] = useState(null)
    const [applications, setApplications] = useState([])

    useEffect(() => {
        getApplications(id)
            .then(data => {
                setApplications(data)
            })
    }, [getApplications, id])

    return (
        <>
            <StandardViewAndFilterLayout
                filter={null}
                sorter={null}
                view={
                    <ColumnAndDetailsLayout
                        details={selectedApplication ?
                            <ApplicationDetails application={selectedApplication} isHR={isHR}/> :
                            <div>Select application</div>}
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