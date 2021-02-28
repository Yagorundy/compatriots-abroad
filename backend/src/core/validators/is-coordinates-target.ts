import { registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraintInterface, ValidatorConstraint } from 'class-validator';
import { GetCoordinatesTarget } from '../../../../common/transfer/coordinates/get-coordinates-target.type';

@ValidatorConstraint()
class IsCoordinatesTargetConstraint implements ValidatorConstraintInterface {
    private validateValues(targetCasted: GetCoordinatesTarget) {
        return targetCasted === 'users' || targetCasted === 'groups'
    }

    validate(target: any, _args: ValidationArguments) {
        return typeof target === 'string' && this.validateValues(target as GetCoordinatesTarget)
    }
}

export function IsCoordinatesTarget(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCoordinatesTargetConstraint
        });
    };
}
