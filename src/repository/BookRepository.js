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
exports.BookRepository = void 0;
class BookRepository {
    constructor(connection) {
        this.connection = connection;
    }
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            // Implement the query to fetch all books from the database
            const [rows] = yield this.connection.execute("SELECT * FROM book");
            // Cast the query result to Book[]
            const books = rows;
            return books;
        });
    }
    createBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implement the query to insert a new book into the database
            const { title, author, price, description, discountRate } = book;
            yield this.connection.execute("INSERT INTO book (title, description, author, price,  discountRate) VALUES (?, ?, ?,  ?, ?)", [title, description, author, price, discountRate]);
        });
    }
}
exports.BookRepository = BookRepository;
