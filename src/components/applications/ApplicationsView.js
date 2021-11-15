import {Redirect, useParams} from "react-router-dom";
import {StandardViewAndFilterLayout} from "../commons/layouts/StandardViewAndFilterLayout";
import {ColumnAndDetailsLayout} from "../commons/layouts/ColumnAndDetailsLayout";
import {ApplicationsList} from "./ApplicationsList";
import React, {useEffect, useState} from "react";
import {ApplicationDetails} from "./ApplicationDetails";
import {DevApplicationDetails} from './DevApplicationDetails';
import {EmptyApplicationsView} from "./EmptyApplicationsView";
import Swal from "sweetalert2";
import CenteredCircularProgress from "../commons/CenteredCircularProgress";
import {useDevPassword} from "../../utils/hooks/useDevPassword";

export const ApplicationsView = ({getApplications, isHR, isDev, mailInBase64}) => {

    const {id} = useParams()
    const {getEncodedDevPassword} = useDevPassword()

    const devPassword = getEncodedDevPassword()

    const [selectedApplication, setSelectedApplication] = useState(null)
    const [applications, setApplications] = useState([])
    const [fetching, setFetching] = useState(false)
    const [fetchError, setFetchError] = useState(false)
    const [reload, setReload] = useState(false)

    const text = isDev ? `We weren't able to get this offer's applications! You will be redirected to main page.` : isHR ? `We weren't able to get this offer's applications! You will be redirected to your offers.` : `We weren't able to get your applications!`

    useEffect(() => {
        setFetching(true)
        getApplications(id, mailInBase64, devPassword)
            .then(data => {
                const applications = isDev ? data.filter(application => application.application.status !== "REJECTED") : data
                setApplications(applications)
                selectedApplication && setSelectedApplication(data.filter(application => application.id === selectedApplication.id)[0])
                setFetching(false)
            }).catch(() => {
                Swal.fire({
                    title: "Error",
                    text: text,
                    icon: "error"
                }).then(() => {
                    setFetchError(true)
                    setFetching(false)
                })
            })
    }, [setApplications, getApplications, id, reload])

    const getStandardView = (innerApplications, WrappedComponent = ApplicationDetails, wrappedProps = {application: selectedApplication, isHR, reload: () => setReload(!reload), isDev}, forDev=false) => (
        <StandardViewAndFilterLayout
            filter={null}
            sorter={null}
            view={
                <ColumnAndDetailsLayout
                    details={selectedApplication ?
                        <WrappedComponent {...wrappedProps}  /> :
                        <div>Select application</div>}
                    list={<ApplicationsList
                        forDev={forDev}
                        applications={innerApplications}
                        onSelectedApplication={selected => setSelectedApplication(selected)}
                    />}
                />
            }
        />
    )

    const getDevView = () => getStandardView(applications.map(application => {
        return {
            ...application,
            organizationUUID: id
        }
    }), DevApplicationDetails, {devApplication: selectedApplication, isDev, reload: () => setReload(!reload)}, true)

    const getView = () => isDev ? getDevView() : getStandardView(applications)

    return fetchError ? <Redirect to={isHR ? '/hr/offers' : '/'} />
        : (fetching ? <CenteredCircularProgress size={80} />
            : (applications?.length !== 0 && applications !== undefined ?
                getView()
                 : <EmptyApplicationsView isHR={isHR} isDev={isDev} />
            )
        )
}