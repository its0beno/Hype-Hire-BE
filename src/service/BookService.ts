// src/service/BookService.ts
import { Book } from "../entity/BookEntity";
import { BookRepository } from "../repository/BookRepository";
import { Connection } from "mysql2/promise";

export class BookService {
  private bookRepository: BookRepository;

  constructor(connection: Connection) {
    this.bookRepository = new BookRepository(connection);
  }

  async getAllBooks(): Promise<Book[]> {
    const books = await this.bookRepository.getAllBooks();
    return books;
  }

  async createBook(book: Book): Promise<void> {
    await this.bookRepository.createBook(book);
  }

  // Implement other book-related business logic as needed (e.g., buyBook)
}
