import {useParams} from "react-router-dom";
import {StandardViewAndFilterLayout} from "../commons/StandardViewAndFilterLayout";
import {ColumnAndDetailsLayout} from "../commons/ColumnAndDetailsLayout";
import {ApplicationsList} from "./ApplicationsList";
import {useEffect, useState} from "react";
import {ApplicationDetails} from "./ApplicationDetails";
import {EmptyApplicationsView} from "./EmptyApplicationsView";

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
            {
                applications?.length !== 0 && applications !== undefined?
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
                /> : <EmptyApplicationsView isHR={isHR} />
            }
        </>
    )
}