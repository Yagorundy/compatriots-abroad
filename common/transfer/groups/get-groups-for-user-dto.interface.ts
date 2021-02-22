import { IGroupInfoDto } from "./group-info-dto.interface";

export interface IGetGroupsForUser {
    myGroups: IGroupInfoDto[]
    groupsILike: IGroupInfoDto[]
}