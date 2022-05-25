import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error("putDb not implemented");
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  console.log("result value: ", result);
  return result;
};

export const deleteDb = async (id) => {
  console.log("DELETE from the database", id);
  const todosDb = await openDB("todos", 1);
  const tx = todosDb.transaction("todos", "readwrite");
  const store = tx.objectStore("todos");
  const request = store.delete(id);
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
