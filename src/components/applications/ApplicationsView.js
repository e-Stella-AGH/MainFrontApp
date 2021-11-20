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
import {NotesDrawer} from '../notes/NotesDrawer'
import { applicationsAPI } from "../../utils/apis/applicationsAPI";

export const ApplicationsView = ({getApplications, isHR, isDev, mailInBase64, organizationUUID}) => {

    const {id} = useParams()
    const {getEncodedDevPassword} = useDevPassword()

    const devPassword = getEncodedDevPassword()

    const [selectedApplication, setSelectedApplication] = useState(null)
    const [applications, setApplications] = useState([])
    const [fetching, setFetching] = useState(false)
    const [fetchError, setFetchError] = useState(false)
    const [reload, setReload] = useState(false)
    const [selectedApplicationNotes, setSelectedApplicationNotes] = useState([])

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

    useEffect(() => {
        if (selectedApplication && isHR) {
            applicationsAPI.getNotesByApplicationIdFromHr(selectedApplication.id)
                .then(data => setSelectedApplicationNotes(data?.notes || []))
        } else if (selectedApplication && isDev) {
            applicationsAPI.getNotesByApplicationIdFromDev(selectedApplication.application.id, devPassword)
                .then(data => setSelectedApplicationNotes(data?.notes || []))
        }
    }, [selectedApplication, reload])

    const getNotesDrawerAnchor = () => isHR ? "left" : isDev ? "right" : "none"
    const getNotesDrawerStyle = () => isDev ? {marginRight: '3em'} : {marginLeft: '3em'}
    const getSelectedApplicationId = () => isDev ? selectedApplication?.application?.id : selectedApplication?.id

    const getStandardView = (innerApplications, WrappedComponent = ApplicationDetails, wrappedProps = {application: selectedApplication, isHR, reload: () => setReload(!reload), isDev}, forDev=false) => (
        <>
            <div style={{...getNotesDrawerStyle()}}>
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
            </div>
            { 
                (isHR || isDev) && getSelectedApplicationId() &&
                <NotesDrawer
                    notes={selectedApplicationNotes}
                    uuid={getSelectedApplicationId()}
                    uuid_key="cv_note"
                    reload={reload}
                    setReload={setReload}
                    anchor={getNotesDrawerAnchor()}
                    shouldUseAuthFetchToPost={isHR}
                /> 
            }
        </>
    )

    const getDevView = () => getStandardView(applications.map(application => {
        return {
            ...application,
            organizationUUID
        }
    }), DevApplicationDetails, {devApplication: {...selectedApplication, organizationUUID}, isDev, reload: () => setReload(!reload)}, true)

    const getView = () => isDev ? getDevView() : getStandardView(applications)

    return fetchError ? <Redirect to={isHR ? '/hr/offers' : '/'} />
        : (fetching ? <CenteredCircularProgress size={80} />
            : (applications?.length !== 0 && applications !== undefined ?
                getView()
                 : <EmptyApplicationsView isHR={isHR} isDev={isDev} />
            )
        )
}