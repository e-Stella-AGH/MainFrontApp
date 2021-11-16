import {decodeBase64} from "../../utils/hooks/Base64"

export const getFirstLineFromTaskDescription = (descriptionInBase64) => {
    const description = decodeBase64(descriptionInBase64)

    const firstLine = description.split('\n')[0]

    return JSON.stringify(firstLine).replace( /\W/g , '')
}