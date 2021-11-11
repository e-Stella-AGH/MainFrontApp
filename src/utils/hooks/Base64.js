
export const decodeBase64 = (base64) => new Buffer(base64, "base64").toString('ascii')

export const encodeBase64 = (string) => new Buffer(string).toString('base64')
