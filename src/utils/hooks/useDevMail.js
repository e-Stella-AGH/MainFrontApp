export const useDevMail = () => {

    const devMailKey = "devMail"

    const setDevMail = (mail) => sessionStorage.setItem(devMailKey, mail)

    const getDevMail = () => sessionStorage.getItem(devMailKey)

    return {getDevMail, setDevMail}

}