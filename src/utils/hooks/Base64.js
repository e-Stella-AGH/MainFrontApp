export const decode = (base64) => new Buffer(base64, "base64").toString('ascii')

export const encode = (string) => new Buffer(string).toString('base64')