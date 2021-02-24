import { NestFactory } from "@nestjs/core";
import { IMigrationRun } from "./interfaces/migration-run.interface";
import { IMigrationStore } from "./interfaces/migration-store.interface";
import { MigrationStoreModule } from "./migration-store.module";
import { MigrationStoreService } from "./migration-store.service";

export default abstract class MigrationStoreBase implements IMigrationStore {
    private migrationStoreService: IMigrationStore;
    protected constructor(private docId: string) { }

    private async initMigrationStoreService() {
        const migrationStoreApp = await NestFactory.create(MigrationStoreModule)
        const migrationStoreService = migrationStoreApp.get(MigrationStoreService)
        migrationStoreService.setDocId(this.docId)
        this.migrationStoreService = migrationStoreService
    }

    async load(callback: (err: Error | null, state?: IMigrationRun) => any) {
        await this.initMigrationStoreService()
        return await this.migrationStoreService.load(callback)
    }

    async save(state: IMigrationRun, callback: (err?: Error) => any) {
        return await this.migrationStoreService.save(state, callback)
    }
}
