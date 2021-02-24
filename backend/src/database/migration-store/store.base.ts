import { IMigrationRun } from "./interfaces/migration-run.interface";
import { IMigrationStore } from "./interfaces/migration-store.interface";
import { MigrationStoreService } from "./store.service";

export default abstract class MigrationStoreBase implements IMigrationStore {
    private migrationStoreService: MigrationStoreService;
    protected constructor(private docId: string) { }

    private async initMigrationStoreService() {
        this.migrationStoreService = new MigrationStoreService()
        await this.migrationStoreService.init(this.docId)
    }

    async load(callback: (err: Error | null, state?: IMigrationRun) => any) {
        await this.initMigrationStoreService()
        return await this.migrationStoreService.load(callback)
    }

    async save(state: IMigrationRun, callback: (err?: Error) => any) {
        return await this.migrationStoreService.save(state, callback)
    }
}
