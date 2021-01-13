import { ValidationError } from "class-validator";

export class ClassValidatorError extends Error {
    constructor(readonly errors: ValidationError[]) {
        super();
    }

    get message() {
        return this.errors.join('')
    }
}
