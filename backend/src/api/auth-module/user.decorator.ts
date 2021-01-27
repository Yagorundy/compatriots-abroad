import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from './user.interface';

export const User = createParamDecorator(
    (_, ctx: ExecutionContext): IUser => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
);
