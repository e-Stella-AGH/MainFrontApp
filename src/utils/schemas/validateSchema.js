export const validateSchema = (obj, schema) => obj &&
    Object
        .keys(schema)
        .every(
                key => schema[key](obj[key])
        )

