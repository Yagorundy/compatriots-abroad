import { IMigration } from "./migration.interface";

export interface IMigrationRun {
    lastRun?: string
    migrations: IMigration[]
}
