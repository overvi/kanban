import { defineConfig } from "cypress";
import mysql from "mysql2";

export default defineConfig({
  projectId: '3nivts',
  env: {
    db: {
      user: "root",
      host: "127.0.0.1",
      database: "todos",
      password: "Alireza",
      port: 3306,
    },
  },
  e2e: {
    experimentalOriginDependencies: true,
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("task", {
        queryDB(query) {
          return queryOnDataBase({ query, config });
        },
      });
    },
  },
});

function queryOnDataBase({ query, config }: any) {
  const connection = mysql.createConnection(config.env.db);

  connection.connect();
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      connection.end();
      return resolve(results);
    });
  });
}
