// src/controller/BookController.ts
import { Request, Response } from "express";
import { BookService } from "../service/BookService";
import { Connection } from "mysql2/promise";

export class BookController {
  private bookService: BookService;

  constructor(connection: Connection) {
    this.bookService = new BookService(connection);
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

  async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await this.bookService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).json({ message: "Internal server error" });
    }
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
  async createBook(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);
      const { title, description, author, price, discountRate } = req.body;

      // Make sure the required fields are present in the request body
      if (!title || !author || !price || !description || !discountRate) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }

      const book = {
        title,
        description,
        author,
        price,
        discountRate,
      };

      await this.bookService.createBook(book);
      res.status(201).json({ message: `Book created successfully` });
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).json({ message: `Internal server error${error}` });
    }
  }

  // Implement other book-related controller methods as needed (e.g., buyBook)
}
