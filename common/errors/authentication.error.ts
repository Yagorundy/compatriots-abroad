import { AppError } from "./app.error";

export class AuthenticationError extends AppError {
    static readonly CODE = 'invalid-authentication'
    static readonly STATUS_CODE = 401
}