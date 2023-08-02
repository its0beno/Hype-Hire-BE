import express, { Request, Response } from "express";
import { createConnection, Connection } from "mysql2/promise";
import { BookController } from "./src/controller/BookController";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { json, urlencoded } from "body-parser";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));
const port = 3000;
// Function to create the database connection
async function createDbConnection(): Promise<Connection> {
  return createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hyperhire",
  });
}

// Routes
app.get("/api/books", async (req: Request, res: Response) => {
  const connection = await createDbConnection();
  const bookController = new BookController(connection);
  await bookController.getAllBooks(req, res);
  connection.end();
});
app.post("/api/books", async (req: Request, res: Response) => {
  const connection = await createDbConnection();
  const bookController = new BookController(connection);
  await bookController.createBook(req, res);
  connection.end();
});
// Swagger documentation options
const swaggerOptions: swaggerJsdoc.Options = {
  swaggerDefinition: {
    info: {
      title: "Bookstore API",
      version: "1.0.0",
      description: "API documentation for the Bookstore application",
    },
  },
  apis: ["./src/controller/BookController.ts"],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
