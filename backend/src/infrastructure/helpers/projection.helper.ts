export function createProjection<T>(includeId: boolean, ...fields: (keyof T)[]) {
    const result = fields.reduce((result, current) => {
        result[current] = 1
        return result
    }, {} as any)
    if (!result['_id']) result['_id'] = 0
    return result
}
