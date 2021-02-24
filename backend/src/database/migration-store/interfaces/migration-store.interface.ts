import { IMigrationRun } from "./migration-run.interface";

export interface IMigrationStore {
    load(callback: (err: Error | null, state?: IMigrationRun) => any): any
    save(state: IMigrationRun, callback: (err?: Error) => any): any
}
