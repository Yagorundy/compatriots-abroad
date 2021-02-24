import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IMigrationRun } from "./interfaces/migration-run.interface";
import { IMigrationStore } from "./interfaces/migration-store.interface";
import { Migration, MigrationDocument } from "./schemas/migration.schema";

export class MigrationStoreService implements IMigrationStore {
    constructor(@InjectModel(Migration.name) private model: Model<MigrationDocument>) { }

    private _docId: string | null = null
    private get docId() {
        if (typeof this._docId !== 'string') throw new Error('Document id for the migrations is not set! Check out the store you are using.')
        return this._docId
    }
    setDocId(docId: string) {
        this._docId = docId
    }

    async load(callback: (err: Error | null, state?: IMigrationRun) => any) {
        try {
            const { migrations } = await this.model.findById(this.docId).orFail()
            return callback(null, { migrations })
        } catch (err) {
            if (err.name === 'DocumentNotFoundError') return callback(null, { migrations: [] })
            return callback(err, null)
        }
    }

    async save(state: IMigrationRun, callback: (err?: Error) => any) {
        try {
            const doc = await this.model.findById(this.docId).orFail()
            doc.lastRun = state.lastRun
            doc.migrations = state.migrations
            await doc.save()
            return callback(null)
        } catch (err) {
            if (err.name === 'DocumentNotFoundError') {
                await this.model.create({
                    _id: this.docId,
                    lastRun: state.lastRun,
                    migrations: state.migrations
                })
                return callback(null)
            }
            return callback(err)
        }
    }
}
