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
        return new Promise(((resolve, reject) => {
            setTimeout(() => {
                resolve("xd")
            }, 2000)
        }))
    },

    registerCompany: function(name, password, email) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve("xd2")
            }, 2000)
        })
    }

}