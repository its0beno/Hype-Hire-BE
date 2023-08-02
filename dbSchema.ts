// dbSchema.ts
import { createPool, Pool, PoolConnection } from "mysql2/promise";

// Create a connection pool to your MySQL database
const pool: Pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "hyperhire",
});

// Define the RDB schema in TypeScript/SQL commands
async function createSchema(): Promise<void> {
  try {
    const connection: PoolConnection = await pool.getConnection();

    // Create the books table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS book (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        imageUrl VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        quantity INT NOT NULL
      )
    `);

    // Create other tables and define relationships, if needed

    connection.release();
    console.log("RDB schema created successfully!");
  } catch (error) {
    console.error("Error creating RDB schema:", error);
  } finally {
    pool.end();
  }
}

// Call the function to create the schema when this file is executed
createSchema();
