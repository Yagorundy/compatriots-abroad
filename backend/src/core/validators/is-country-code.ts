import { registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraintInterface, ValidatorConstraint } from 'class-validator';
import { countriesByCode } from '../../../../common/constants/countries.constants';

@ValidatorConstraint()
class IsCountryCodeConstraint implements ValidatorConstraintInterface {
    validate(countryCode: any, _args: ValidationArguments) {
        return typeof countryCode === 'string' && !!countriesByCode[countryCode]
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
