import { AppError } from "./app.error";

export class ValidationError extends AppError {
    static readonly CODE = 'invalid'
    static readonly STATUS_CODE = 400
}