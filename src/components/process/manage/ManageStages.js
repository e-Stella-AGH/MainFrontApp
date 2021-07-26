import {useEffect, useState} from "react";
import {processAPI} from "../../../utils/apis/ProcessAPI";
import {Box, Card, CardContent, Typography} from "@material-ui/core";
import {TwoColumnDnD} from "estella-two-column-dnd";
import {colors} from "../../../utils/colors";
import {withSwal} from "../../commons/formsCommons/WithSwal";
import Swal from "sweetalert2";

export const ManageStages = ({processId}) => {

    const [stages, setStages] = useState([])
    const [possibleStages, setPossibleStages] = useState([])

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
        processAPI.getAllPossibleStages()
            .then(data => setPossibleStages(data))
    }, [processId])

    const getPossibleStages = () => possibleStages.map(stage => {
        return {'type': stage}
    })

    const getStages = () => stages

    const handleSubmit = (items) => {
        withSwal({
            loadingTitle: "Updating stages",
            promise: () => processAPI.updateProcessStages(processId, items.map(item => item.type)),
            successSwalTitle: "Stages Updated"
        })
    }

    const fireSwal = (title, text, icon) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon
        })
    }

    return (
        <TwoColumnDnD
            firstListItems={getStages()}
            secondListItems={getPossibleStages()}
            forbiddenIndexes={[0, getStages()?.length]}
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
            onSubmit={(first, _) => handleSubmit(first)}
            leftSubmitGridProps={{xs: 10}}
            centerSubmitGridProps={{xs: 1}}
            rightSubmitGridProps={{xs: 1}}
            materialButtonProps={{variant: "outlined"}}
            submitDivStyle={{marginTop: "15px"}}
            listStyle={{height: "60vh", backgroundColor: colors.palette[7], padding: "1em", overflowY: "scroll"}}
        />
    )
}