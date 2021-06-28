export const loginAPI = {

    login: function(login, password) {
        console.log(login, password)
        return new Promise(((resolve, reject) => {
            setTimeout(() => {
                resolve("Token")
            }, 2000)
        }))
    },

    registerUser: function(login, password, firstName, lastName) {
        console.log(login, password, firstName, lastName)
        return new Promise(((resolve, reject) => {
            setTimeout(() => {
                resolve("xd")
            }, 2000)
        }))
    }

}