import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {processAPI} from "../../../utils/apis/ProcessAPI";
import {Box, Card, CardContent, Typography} from "@material-ui/core";
import {TwoColumnDnD} from "estella-two-column-dnd";
import {colors} from "../../../utils/colors";

export const ManageStages = ({}) => {

    const {id} = useParams()
    const [stages, setStages] = useState([])
    const [possibleStages, setPossibleStages] = useState([])

    useEffect(() => {
        processAPI.getProcessById(id)
            .then(data => setStages(data.stages))
        processAPI.getAllPossibleStages()
            .then(data => setPossibleStages(data))
    }, [id])

    const getPossibleStages = () => possibleStages.map(stage => {
        return {'type': stage}
    })

    const getStages = () => stages

    const handleSubmit = (items) => {

    }

    return (
        <TwoColumnDnD
            firstListItems={getStages()}
            secondListItems={getPossibleStages()}
            forbiddenIndexes={[-1, 15]}
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