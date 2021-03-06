import React, {useEffect, useState} from "react";
import {processAPI} from "../../../utils/apis/ProcessAPI";
import {Box, Card, CardContent, Typography, useTheme} from "@material-ui/core";
import {TwoColumnDnD} from "estella-two-column-dnd";
import {withSwal} from "../../commons/formsCommons/WithSwal";
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";

export const ManageStages = ({processId}) => {

    const theme = useTheme()

    const [stages, setStages] = useState([])
    const [possibleStages, setPossibleStages] = useState([])
    const [fetchError, setFetchError] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        let swal = new Swal({
            title: "Getting data"
        })
        Swal.showLoading()
        processAPI.getProcessById(processId)
            .then(data => {
                setStages(data.stages);
                swal.close()
            })
            .catch(() => {
                Swal.fire({
                    title: "Error",
                    text: "We were unable to get process data!",
                    icon: "error"
                }).then(() => setFetchError(true))
            })
            .finally(() => swal.close())
        processAPI.getAllPossibleStages()
            .then(data => setPossibleStages(data))
            .catch(() => {
                Swal.fire({
                    title: "Error",
                    text: "We were unable to get possible stages!",
                    icon: "error"
                }).then(() => setFetchError(true))
            })
            .finally(() => swal.close())
    }, [reload, processId])

    const getPossibleStages = () => possibleStages.map(stage => {
        return {'type': stage}
    })

    const getStages = () => stages

    const handleSubmit = (items) => {
        if(items !== getStages()) {
            withSwal({
                loadingTitle: "Updating stages",
                promise: () => processAPI.updateProcessStages(processId, items.map(item => item.type)),
                successSwalTitle: "Stages Updated",
                successFunction: () => setReload(reload => !reload)
            })
        }
    }

    const fireSwal = (title, text, icon) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon
        })
    }

    return fetchError ? <Redirect to="/" /> : <TwoColumnDnD
        firstListItems={getStages()}
        secondListItems={getPossibleStages()}
        //temporary solution - would be the best to actually change TwoColumnDnD to fire callback about setting items length
        forbiddenIndexes={[0, getStages().length]}
        warningFunction={() => fireSwal(
            "You can't do this!",
            "We're sorry, but you cannot set this stage here! See help for more information.",
            "warning"
        )}
        itemRender={(item) => (
            <Box m={1}>
                <Card variant="outlined" style={{textAlign: "center"}}>
                    <CardContent>
                        <Typography>{item.type}</Typography>
                    </CardContent>
                </Card>
            </Box>
        )}
        onFirstListChange={(items) => handleSubmit(items)}
        leftSubmitGridProps={{xs: 10}}
        centerSubmitGridProps={{xs: 1}}
        rightSubmitGridProps={{xs: 1}}
        materialButtonProps={{variant: "outlined"}}
        submitDivStyle={{marginTop: "15px"}}
        listStyle={{height: "60vh", backgroundColor: theme.palette.focused.dark, padding: "1em", overflowY: "scroll"}}
    />
}