export const useKeyPress = (key, event, action) => {
    if(event.key === key) {
        action()
        event.preventDefault()
    }
}

export const keys = {
    Enter: "Enter"
}