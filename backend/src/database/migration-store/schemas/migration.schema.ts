import { Prop, Schema, SchemaFactory,  } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IMigrationRun } from "../interfaces/migration-run.interface";
import { IMigration } from "../interfaces/migration.interface";

export type MigrationDocument = Migration & Document

@Schema()
export class Migration implements IMigrationRun {
    @Prop()
    _id: string

    @Prop()
    lastRun: string

    @Prop()
    migrations: IMigration[]
}

export const MigrationSchema = SchemaFactory.createForClass(Migration)
