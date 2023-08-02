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
exports.BookController = void 0;
const BookService_1 = require("../service/BookService");
class BookController {
    constructor(connection) {
        this.bookService = new BookService_1.BookService(connection);
    }
    /**
     * @swagger
     * /api/books:
     *   get:
     *     summary: Get all books.
     *     tags:
     *       - Books
     *     responses:
     *       200:
     *         description: Successful response with an array of books.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Book'
     *       500:
     *         description: Internal server error.
     */
    getAllBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield this.bookService.getAllBooks();
                res.status(200).json(books);
            }
            catch (error) {
                console.error("Error fetching books:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    /**
     * @swagger
     * /api/books:
     *   post:
     *     summary: Create a new book.
     *     tags:
     *       - Books
     *     requestBody:
     *       description: Book object to be created.
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Book'
     *     responses:
     *       201:
     *         description: Book created successfully.
     *       400:
     *         description: Bad Request. Missing or invalid data in the request.
     *       500:
     *         description: Internal server error.
     */
    createBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { title, description, imgUrl, price, discountRate } = req.body;
                // Make sure the required fields are present in the request body
                if (!title || !imgUrl || !price || !description || !discountRate) {
                    res.status(400).json({ message: "All fields are required" });
                    return;
                }
                const book = {
                    title,
                    description,
                    imgUrl,
                    price,
                    discountRate,
                };
                yield this.bookService.createBook(book);
                res.status(201).json({ message: `Book created successfully` });
            }
            catch (error) {
                console.error("Error creating book:", error);
                res.status(500).json({ message: `Internal server error${error}` });
            }
        });
    }
}
exports.BookController = BookController;
