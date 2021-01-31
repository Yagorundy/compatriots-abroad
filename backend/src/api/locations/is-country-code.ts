import { registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraintInterface, ValidatorConstraint } from 'class-validator';
import { countryNamesByCode } from '../../../../common/constants/countries.constant';

@ValidatorConstraint()
class IsCountryCodeConstraint implements ValidatorConstraintInterface {
    validate(countryCode: any, _args: ValidationArguments) {
        return typeof countryCode === 'string' && !!countryNamesByCode[countryCode]
    }
}

export function IsCountryCode(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCountryCodeConstraint
        });
    };
}
