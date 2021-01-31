import { registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraintInterface, ValidatorConstraint } from 'class-validator';
import { GetLocationsTarget } from '../../../../common/transfer/locations/get-locations-target.type';

@ValidatorConstraint()
class IsLocationsTargetConstraint implements ValidatorConstraintInterface {
    private validateValues(targetCasted: GetLocationsTarget) {
        return targetCasted === 'users' || targetCasted === 'groups'
    }

    validate(target: any, _args: ValidationArguments) {
        return typeof target === 'string' && this.validateValues(target as GetLocationsTarget)
    }
}

export function IsLocationsTarget(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsLocationsTargetConstraint
        });
    };
}
