export const decodeBase64 = (base64) => Buffer.from(base64, "base64").toString('ascii')

export const encodeBase64 = (string) => Buffer.from(string).toString('base64')