export const userSchema = {
    firstName: (value) => typeof value === 'string',
    lastName: (value) => typeof value === 'string',
    mail: (value) => typeof value === 'string',
    iss: (value) => typeof value === 'string' && !isNaN(Number(value))
}