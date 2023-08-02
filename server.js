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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promise_1 = require("mysql2/promise");
const BookController_1 = require("./src/controller/BookController");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
const port = 3000;
// Function to create the database connection
function createDbConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, promise_1.createConnection)({
            host: "localhost",
            user: "root",
            password: "",
            database: "hyperhire",
        });
    });
}
// Routes
app.get("/api/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield createDbConnection();
    const bookController = new BookController_1.BookController(connection);
    yield bookController.getAllBooks(req, res);
    connection.end();
}));
app.post("/api/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield createDbConnection();
    const bookController = new BookController_1.BookController(connection);
    yield bookController.createBook(req, res);
    connection.end();
}));
// Swagger documentation options
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Bookstore API",
            version: "1.0.0",
            description: "API documentation for the Bookstore application",
        },
    },
    apis: ["./src/controller/BookController.ts"],
};
const swaggerSpecs = (0, swagger_jsdoc_1.default)(swaggerOptions);
// Serve Swagger documentation
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpecs));
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
