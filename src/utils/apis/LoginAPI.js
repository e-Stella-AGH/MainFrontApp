export const loginAPI = {

    login: function(login, password) {
        console.log(login, password)
        return new Promise(((resolve, reject) => {
            setTimeout(() => {
                resolve("Token")
            }, 2000)
        }))
    }

}