import { AppError } from "./app.error";

export class AuthorizationError extends AppError {
    static readonly CODE = 'not-authorized'
    static readonly STATUS_CODE = 403
}