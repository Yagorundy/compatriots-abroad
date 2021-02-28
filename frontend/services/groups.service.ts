import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { IGetGroupsForUser } from "~/../common/transfer/groups/get-groups-for-user-dto.interface";
import { IGroupCreateDto } from "~/../common/transfer/groups/group-create-dto.interface";
import { IGroupDto } from "~/../common/transfer/groups/group-dto.interface";
import { IGroupUpdateDto } from "~/../common/transfer/groups/group-update-dto.interface";

export class GroupsService {
  constructor(private axios: NuxtAxiosInstance) { }

  async create(data: IGroupCreateDto) {
    return await this.axios.$post('/groups', data)
  }

  async get(id: string) {
    return await this.axios.$get<IGroupDto>(`/groups/${id}`)
  }

  async getGroupsForUser() {
    return await this.axios.$get<IGetGroupsForUser>('/groups')
  }

  async update(data: IGroupUpdateDto) {
    return await this.axios.$put('/groups', data)
  }

  async delete(id: string) {
    await this.axios.$delete(`/groups/${id}`)
  }
}
