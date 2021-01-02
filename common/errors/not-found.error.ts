import { AppError } from "./app.error";

export class NotFoundError extends AppError {
    static readonly CODE = 'not-found'
    static readonly STATUS_CODE = 404
}