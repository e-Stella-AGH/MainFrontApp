import {Redirect, useParams} from "react-router-dom";
import {StandardViewAndFilterLayout} from "../commons/layouts/StandardViewAndFilterLayout";
import {ColumnAndDetailsLayout} from "../commons/layouts/ColumnAndDetailsLayout";
import {ApplicationsList} from "./ApplicationsList";
import {useEffect, useState} from "react";
import {ApplicationDetails} from "./ApplicationDetails";
import {EmptyApplicationsView} from "./EmptyApplicationsView";
import {CircularProgress} from "@material-ui/core";
import Swal from "sweetalert2";

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
            }).catch(err => {
                Swal.fire({
                    title: "Error",
                    text: "We weren't able to find this offer!",
                    icon: "error"
                })
                setFetching(false)
                setFetchError(true)
            })
    }, [getApplications, id, reload])

    return (
        fetchError ? <Redirect to="/" /> : <>
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