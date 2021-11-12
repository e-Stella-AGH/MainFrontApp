import {Redirect, useParams} from "react-router-dom";
import {StandardViewAndFilterLayout} from "../commons/layouts/StandardViewAndFilterLayout";
import {ColumnAndDetailsLayout} from "../commons/layouts/ColumnAndDetailsLayout";
import {ApplicationsList} from "./ApplicationsList";
import React, {useEffect, useState} from "react";
import {ApplicationDetails} from "./ApplicationDetails";
import {EmptyApplicationsView} from "./EmptyApplicationsView";
import Swal from "sweetalert2";
import CenteredCircularProgress from "../commons/CenteredCircularProgress";

export const ApplicationsView = ({getApplications, isHR}) => {

    const {id} = useParams()

    const [selectedApplication, setSelectedApplication] = useState(null)
    const [applications, setApplications] = useState([])
    const [fetching, setFetching] = useState(false)
    const [fetchError, setFetchError] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setFetching(true)
        getApplications(id)
            .then(data => {
                setApplications(data)
                selectedApplication && setSelectedApplication(data.filter(application => application.id === selectedApplication.id)[0])
                setFetching(false)
            }).catch(() => {
                Swal.fire({
                    title: "Error",
                    text: "We weren't able to get this offer's applications! You will be redirected to your offers",
                    icon: "error"
                }).then(() => {
                    setFetchError(true)
                    setFetching(false)
                })
            })
    }, [setApplications, getApplications, id, reload])

    return fetchError ? <Redirect to="/hr/offers" />
        : (fetching ? <CenteredCircularProgress size={80} />
            : (applications?.length !== 0 && applications !== undefined ?
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
            )
        )
}