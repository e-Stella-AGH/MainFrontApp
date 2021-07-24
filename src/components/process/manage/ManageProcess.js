import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {processAPI} from "../../../utils/apis/ProcessAPI";
import {Card, Typography} from "@material-ui/core";
import {TwoColumnDnD} from "estella-two-collumn-dnd";

export const ManageProcess = ({}) => {

    const {id} = useParams()
    const [stages, setStages] = useState([])
    const [possibleStages, setPossibleStages] = useState([])

    useEffect(() => {
        processAPI.getProcessById(id)
            .then(data => setStages(data.stages))
        processAPI.getAllPossibleStages()
            .then(data => setPossibleStages(data))
    }, [id])

    const getPossibleStages = () => possibleStages.map(elem => {
        return {'id': 0, 'type': elem}
    })

    return (
        <div>
            <TwoColumnDnD
                firstListItems={stages}
                secondListItems={getPossibleStages()}
                forbiddenIndexes={[-1, 15]}
                itemRender={(item) => (<Card style={{margin: '1em'}}><Typography variant="h6">{item.type}</Typography></Card>)}
            />
        </div>
    )
}
