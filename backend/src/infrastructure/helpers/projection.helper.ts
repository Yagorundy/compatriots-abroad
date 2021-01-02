export function createProjection<T>(...fields: (keyof T)[]) {
    return fields.reduce((result, current) => {
        result[current] = 1
        return result
    }, {} as any)
}
