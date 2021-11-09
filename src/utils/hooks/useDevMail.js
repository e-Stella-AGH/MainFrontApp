export const useDevMail = () => {

    const devMailKey = "devMail"

    const set = (mail) => sessionStorage.setItem(devMailKey, mail)

    const get = () => sessionStorage.getItem(devMailKey)

    return {get, set}

}