export const validateSchema = (obj, schema) =>
    Object
        .keys(schema)
        .every(
            key => schema[key](obj[key])
        )