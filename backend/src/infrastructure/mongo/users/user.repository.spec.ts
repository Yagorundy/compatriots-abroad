import { UserRepository } from './user.repository';
import { getMongoFakeUserRepo } from './user.repository.fake';

describe(UserRepository.name, () => {
    let repo: UserRepository

    beforeAll(async () => {
        repo = await getMongoFakeUserRepo()
    })

    it('should be defined', () => {
        expect(repo).toBeDefined()
    })
});
