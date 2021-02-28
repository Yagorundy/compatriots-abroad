import { AutoMap } from "@automapper/classes";
import { IGroupDto } from "../../../../../common/transfer/groups/group-dto.interface";

export class GroupDto implements IGroupDto {
    @AutoMap()
    id: string

    @AutoMap()
    creatorId: string

    @AutoMap()
    isLiked: boolean

    @AutoMap()
    name: string

    @AutoMap()
    description: string

    @AutoMap()
    countryOfOrigin: string

    @AutoMap()
    address: string
}
