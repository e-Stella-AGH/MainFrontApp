export const loginAPI = {

    login: function(login, password) {
        return new Promise(((resolve, reject) => {
            setTimeout(() => {
                resolve({text: "ok", ok: true})
            }, 2000)
        }))
    },

    registerUser: function(login, password, firstName, lastName) {
        return new Promise(((resolve, reject) => {
            setTimeout(() => {
                resolve({text: "ok", ok: true})
            }, 2000)
        }))
    },

    registerCompany: function(name, password, email) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({text: "ok", ok: true})
            }, 2000)
        })
    }

}