import { Document, LeanDocument, Model, Query, Error as MongoError } from "mongoose";
import { AppError } from "../../../../common/errors/app.error";
import { NotFoundError } from "../../../../common/errors/not-found.error";

type DocumentNonNullableId<T extends Document> = T & {
    id: any
    _id: any
}

export abstract class MongoRepository<T extends Document> {
    constructor(protected model: Model<T>) { }

    // We have to do this ugly casting because Mongoose has problems with generics inheritance
    private get modelCasted() {
        // @ts-ignore
        return this.model as Model<Document>;
    }

    protected async wrapQuerySingle(query: Query<T, T>, $throw = true) {
        try {
            return (await ($throw ? query.orFail() : query)) as DocumentNonNullableId<T>
        } catch (err) {
            throw new NotFoundError(`Could not find document!`, err)
        }
    }

    protected async wrapQueryArray(query: Query<Array<T>, T>, $throw = false) {
        try {
            return await ($throw ? query.orFail() : query) as DocumentNonNullableId<T>[]
        } catch (err) {
            if (err instanceof MongoError.DocumentNotFoundError) {
                if ($throw) throw new NotFoundError(`Could not find any documents!`, err)
                return []
            }
            throw new AppError(`Unexpected mongo error!`, err)
        }
    }

    protected createProjection(...fields: (keyof LeanDocument<T>)[]) {
        return fields.length > 0
            ? fields.reduce((result, field) => {
                result[field] = 1
                return result
            }, { '_id': 0 } as any)
            : undefined
    }

    protected docToObj(doc: DocumentNonNullableId<T>): Omit<LeanDocument<DocumentNonNullableId<T>>, '_id' | '__v'> {
        // @ts-ignore
        return doc.toObject({
            versionKey: false,
            transform: (_doc, res, _options) => {
                if (res._id) {
                    res.id = res._id.toString()
                    delete res._id
                }
            }
        })
    }

    protected async exists(id: string) {
        return await this.modelCasted.exists({ _id: id })
    }

    protected async create(data: Partial<LeanDocument<T>>) {
        const doc = new this.model(data)
        await doc.validate()
        return await doc.save() as DocumentNonNullableId<T>
    }

    protected async get(id: string, ...fields: (keyof LeanDocument<T>)[]) {
        return await this.wrapQuerySingle(this.model.findById(id, this.createProjection(...fields)))
    }

    protected async patch(id: string, data: Partial<LeanDocument<T>>) {
        return await this.modelCasted.findByIdAndUpdate(id, data, { new: true, useFindAndModify: false, runValidators: true }) as DocumentNonNullableId<T>
    }

    protected async delete(id: string) {
        return await this.modelCasted.deleteOne({ _id: id })
    }
}
