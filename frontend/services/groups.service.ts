import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { IGetGroupsForUser } from "~/../common/transfer/groups/get-groups-for-user-dto.interface";
import { IGroupDto } from "~/../common/transfer/groups/group-dto.interface";

export class GroupsService {
  constructor(private axios: NuxtAxiosInstance) { }

  async create(data: IGroupDto) {
    return await this.axios.$post('/groups', data)
  }

  async getGroup(id: string) {
    return await this.axios.$get(`/groups/${id}`)
  }

  async getGroupsForUser() {
    return await this.axios.$get<IGetGroupsForUser>('/groups')
  }

  // async update(data: IUserProfile) {
  //   return await this.axios.$put('/groups', data)
  // }
}
