import MigrationStoreBase from "./store.base";

class MeiliseachMigrationStore extends MigrationStoreBase {
    constructor() { super('meilisearch') }
}

// crucial
module.exports = MeiliseachMigrationStore
