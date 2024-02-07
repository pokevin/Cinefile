import { DBSchema, StoreKey, StoreNames, StoreValue, openDB } from "idb";

export interface Database extends DBSchema {
  [tablename: string]: {
    key: string;
    value: {
      id: string;
      // biome-ignore lint/suspicious/noExplicitAny: Allow any data modal with a string id
      [attr: string]: any;
    };
    indexes?: Record<string, string>;
  };
}

export async function initDb<DB extends Database>(
  dbname: string,
  tablenames: StoreNames<DB>[],
) {
  const db = await openDB<DB>(dbname, 1, {
    upgrade(database) {
      for (const tablename of tablenames) {
        database.createObjectStore(tablename, {
          keyPath: "id",
        });
      }
    },
  });

  return {
    getAll(tablename: StoreNames<DB>) {
      return db.getAll(tablename);
    },
    insertOne<Item extends StoreValue<DB, StoreNames<DB>>>(
      tablename: StoreNames<DB>,
      item: Item,
    ) {
      return db.add(tablename, item);
    },
    insertMany<Item extends StoreValue<DB, StoreNames<DB>>>(
      tablename: StoreNames<DB>,
      items: Item[],
    ) {
      const tx = db.transaction(tablename, "readwrite");
      return Promise.all([...items.map((item) => tx.store.add(item)), tx.done]);
    },
    update<Item extends StoreValue<DB, StoreNames<DB>>>(
      tablename: StoreNames<DB>,
      item: Item,
    ) {
      return db.put(tablename, item);
    },
    deleteOne<Id extends StoreKey<DB, StoreNames<DB>>>(
      tablename: StoreNames<DB>,
      id: Id,
    ) {
      return db.delete(tablename, id);
    },
    deleteMany<Id extends StoreKey<DB, StoreNames<DB>>>(
      tablename: StoreNames<DB>,
      ids: [Id, ...Id[]],
    ) {
      const tx = db.transaction(tablename, "readwrite");
      return Promise.all([...ids.map((id) => tx.store.delete(id)), tx.done]);
    },
  };
}
