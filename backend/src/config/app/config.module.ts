import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppConfigService } from "./config.service";

@Module({
    imports: [ConfigModule.forRoot()],
    providers: [AppConfigService]
})
export class AppConfigModule { }