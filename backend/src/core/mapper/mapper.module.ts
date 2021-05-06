import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";
import { Module } from "@nestjs/common";
import { GroupProfile } from "./group.profile";
import { UserProfile } from "./user.profile";

@Module({
    imports: [
        AutomapperModule.forRoot({
            options: [{ name: 'default', pluginInitializer: classes }],
            singular: true
        }),
    ],
    providers: [
        UserProfile,
        GroupProfile
    ]
})
export class MapperModule {}
