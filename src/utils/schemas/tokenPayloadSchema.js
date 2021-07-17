export const tokenPayloadSchema = {
    firstName: (value) => typeof value === 'string',
    lastName: (value) => typeof value === 'string',
    userType: (value) => value === 'job_seeker' || value === 'hr' || value === 'organization',
    mail: (value) => typeof value === 'string',
    iss: (value) => typeof value === 'string' && !isNaN(Number(value)),
    iat: (value) => typeof value === 'number' && value % 1 === 0,
    exp: (value) => typeof value === 'number' && value % 1 === 0
}