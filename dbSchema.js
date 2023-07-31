"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// dbSchema.ts
const promise_1 = require("mysql2/promise");
// Create a connection pool to your MySQL database
const pool = (0, promise_1.createPool)({
    host: "localhost",
    user: "root",
    password: "",
    database: "hyperhire",
});
// Define the RDB schema in TypeScript/SQL commands
function createSchema() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield pool.getConnection();
            // Create the books table
            yield connection.query(`
      CREATE TABLE IF NOT EXISTS book (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        quantity INT NOT NULL
      )
    `);
            // Create other tables and define relationships, if needed
            connection.release();
            console.log("RDB schema created successfully!");
        }
        catch (error) {
            console.error("Error creating RDB schema:", error);
        }
        finally {
            pool.end();
        }
    });
}
// Call the function to create the schema when this file is executed
createSchema();
