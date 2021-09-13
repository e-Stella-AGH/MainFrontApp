import {useState} from "react";
import {constants} from "../../../utils/constants";
import {scrollToTop} from "../../../utils/functions";
import {ListElement} from "./ListElement";

export const ListWithSelection = ({listItems, extractData, limit, propsHandleSelect}) => {

    const [selectedIdx, setSelectedIdx] = useState(-1)

    const handleSelect = (item, idx) => {
        setSelectedIdx(idx)
        propsHandleSelect(item, idx)
        scrollToTop()
    }

    const getListItems = () => {
        return listItems
            ?.filter((item, idx) => limit ? idx < limit : true)
            ?.map((item, idx) => {
                return selectedIdx === idx ?
                    <ListElement key={idx} idx={idx} onClick={(item, idx) => handleSelect(item, idx)}
                              selected data={extractData(item)} />
                    : <ListElement key={idx} idx={idx} onClick={(item, idx) => handleSelect(item, idx)} data={extractData(item)}
                                selected={false} />
            })
    }

    return (
        <div style={{overflowY: 'scroll', height: `calc(100vh - 7em - ${constants["navbar_height"]})`}}>
            {getListItems()}
        </div>
    )

}