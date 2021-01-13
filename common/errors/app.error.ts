export class AppError extends Error {
    static readonly CODE: string = 'app-error'
    static readonly STATUS_CODE: number = 500

    constructor(
        readonly message: string,
        readonly parent?: AppError | Error
    ) {
        super(message)
    }

    get code(): string | undefined {
        // @ts-ignore
        return this.constructor.CODE
    }

    get statusCode(): number | undefined {
        // @ts-ignore
        return this.constructor.STATUS_CODE
    }
}