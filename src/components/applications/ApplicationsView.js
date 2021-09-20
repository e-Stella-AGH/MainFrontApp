import {useParams} from "react-router-dom";
import {StandardViewAndFilterLayout} from "../commons/layouts/StandardViewAndFilterLayout";
import {ColumnAndDetailsLayout} from "../commons/layouts/ColumnAndDetailsLayout";
import {ApplicationsList} from "./ApplicationsList";
import React, {useEffect, useState} from "react";
import {ApplicationDetails} from "./ApplicationDetails";
import {EmptyApplicationsView} from "./EmptyApplicationsView";
import {CircularProgress} from "@material-ui/core";

export const ApplicationsView = ({getApplications, isHR}) => {

    const {id} = useParams()

    const [selectedApplication, setSelectedApplication] = useState(null)
    const [applications, setApplications] = useState([])
    const [fetching, setFetching] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setFetching(true)
        getApplications(id)
            .then(data => {
                setApplications(data)
                selectedApplication && setSelectedApplication(data.filter(application => application.id === selectedApplication.id)[0])
                setFetching(false)
            }).catch(() => setFetching(false))
    }, [getApplications, id, reload])

    return (
        <>
            {
                fetching ? <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}><CircularProgress size={100} /></div>
                    :
                applications?.length !== 0 && applications !== undefined ?
                <StandardViewAndFilterLayout
                    filter={null}
                    sorter={null}
                    view={
                        <ColumnAndDetailsLayout
                            details={selectedApplication ?
                                <ApplicationDetails application={selectedApplication} isHR={isHR} reload={() => setReload(!reload)} /> :
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