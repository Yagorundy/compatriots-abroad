import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtConfigService } from "./jwt-config.service";

@Module({
    providers: [JwtConfigService],
    imports: [ConfigModule.forRoot()],
    exports: [ConfigModule, JwtConfigService]
})
export class JwtConfigModule { }
