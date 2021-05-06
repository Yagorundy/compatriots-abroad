import { JwtOptionsFactory } from "@nestjs/jwt";

export interface IJwtConfigService extends JwtOptionsFactory {
    readonly secret: string;
}
