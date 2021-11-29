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
import { Filter } from '../commons/filter/Filter'
import { filterItems } from "../../utils/functions";
import { ApplicationsInDrawerFilter } from "./filters/InDrawerFilter";
import { Typography } from '@material-ui/core'
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

    // state for filter and sort
    const [fixedApplications, setFixedApplications] = useState([])
    const [sort, setSort] = useState({apply: (applications) => applications})

    const handleFilterSubmitted = (filters) => {
        if(areFiltersValid(filters)){
            setApplications(sort.apply(filterItems(fixedApplications, filters)))
        }
        else {
            setApplications(sort.apply(fixedApplications))
        }
    }

    const areFiltersValid = (filters) => filters.map(filter => filter.value)
        .some(value => value?.length !== undefined ? value?.length > 0 : !!value)

    const text = isDev ? `We weren't able to get this offer's applications! You will be redirected to main page.` : isHR ? `We weren't able to get this offer's applications! You will be redirected to your offers.` : `We weren't able to get your applications!`

    useEffect(() => {
        setFetching(true)
        getApplications(id, mailInBase64, devPassword)
            .then(data => {
                const applications = isDev ? data.filter(application => application.application.status !== "REJECTED") : data
                setApplications(applications)
                setFixedApplications(applications)
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

    const getFilterView = (applications, fixedApplications) => (
        <Filter
            onFilterSubmitted={handleFilterSubmitted}
            reloadItems={handleFilterSubmitted}
            InDrawerFilter={ApplicationsInDrawerFilter}
            InDrawerFilterProps={{
                items: applications,
                fixedItems: fixedApplications,
            }}
        />
    )

    const getStandardView = (innerApplications, fixedInnerApplications, WrappedComponent = ApplicationDetails, wrappedProps = {application: selectedApplication, isHR, reload: () => setReload(!reload), isDev}, forDev=false) => (
        <>
            <div style={{...getNotesDrawerStyle()}}>
                <StandardViewAndFilterLayout
                    filter={getFilterView(innerApplications, fixedInnerApplications)}
                    sorter={null}
                    view={
                        <ColumnAndDetailsLayout
                            details={selectedApplication ?
                                <WrappedComponent {...wrappedProps}  /> :
                                <EmptySelectedApplicationView />}
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

    const mapApplicationForDev = application => {
        return {
            ...application,
            organizationUUID
        }
    }
    const getDevView = () => getStandardView(applications.map(mapApplicationForDev), fixedApplications.map(mapApplicationForDev),
    DevApplicationDetails, {devApplication: {...selectedApplication, organizationUUID}, isDev, reload: () => setReload(!reload)}, true)

    const getView = () => isDev ? getDevView() : getStandardView(applications, fixedApplications)

    return fetchError ? <Redirect to={isHR ? '/hr/offers' : '/'} />
        : (fetching ? <CenteredCircularProgress size={80} />
            : (fixedApplications?.length !== 0 && fixedApplications !== undefined ?
                getView()
                 : <EmptyApplicationsView isHR={isHR} isDev={isDev} />
            )
        )
}

const EmptySelectedApplicationView = () => {

    return (
        <div style={{textAlign: 'center'}}>
            <img src="https://img.myloview.pl/fototapety/job-application-or-employment-resume-research-for-vacancy-outline-concept-work-candidate-documentation-with-cv-motivation-letter-after-job-interview-vector-illustration-business-labor-and-hr-scene-700-255625478.jpg" alt="Application" style={{width: '80%'}} />
            <Typography variant="h6" color="textSecondary">Pick application from the list on the right</Typography>
        </div>
    )
}