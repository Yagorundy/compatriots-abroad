import { GroupRepository } from './group.repository';
import { getMongoFakeGroupRepo } from './group.repository.fake';

describe(GroupRepository.name, () => {
    let repo: GroupRepository

    beforeAll(async () => {
        repo = await getMongoFakeGroupRepo()
    })

    it('should be defined', () => {
        expect(repo).toBeDefined()
    })
});
