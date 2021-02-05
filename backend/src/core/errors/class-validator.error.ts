import { ValidationError } from "class-validator";

export class ClassValidatorError extends Error {
    constructor(readonly errors: ValidationError[]) {
        super();
    }

    get message() {
        return this.errors.map(e => {
            try {
                return e.toString()
            } catch (_) {
                return ''
            }
        }).join('')
    }
}
