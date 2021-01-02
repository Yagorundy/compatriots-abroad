import { AppError } from "../app.error";

export class InvalidLoginError extends AppError {
    static readonly CODE = 'invalid-login'
    static readonly STATUS_CODE = 401
}