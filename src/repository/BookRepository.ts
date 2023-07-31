// src/repository/BookRepository.ts
import { Book } from "../entity/BookEntity";
import { Connection, RowDataPacket } from "mysql2/promise";

export class BookRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async getAllBooks(): Promise<Book[]> {
    // Implement the query to fetch all books from the database
    const [rows] = await this.connection.execute<RowDataPacket[]>(
      "SELECT * FROM book"
    );

    // Cast the query result to Book[]
    const books: Book[] = rows as Book[];
    return books;
  }
  async createBook(book: Book): Promise<void> {
    // Implement the query to insert a new book into the database
    const { title, author, price, description, discountRate } = book;
    await this.connection.execute(
      "INSERT INTO book (title, description, author, price,  discountRate) VALUES (?, ?, ?,  ?, ?)",
      [title, description, author, price, discountRate]
    );
  }
}
