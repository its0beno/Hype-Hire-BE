import { Book } from "../entity/BookEntity";
import { Connection, RowDataPacket } from "mysql2/promise";

export class BookRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async getAllBooks(): Promise<Book[]> {
    const [rows] = await this.connection.execute<RowDataPacket[]>(
      "SELECT * FROM book"
    );

    const books: Book[] = rows as Book[];
    return books;
  }
  async createBook(book: Book): Promise<void> {
    // Implement the query to insert a new book into the database
    const { title, imgUrl, price, description, discountRate } = book;
    await this.connection.execute(
      "INSERT INTO book (title, description, imgUrl, price,  discountRate) VALUES (?, ?, ?,  ?, ?)",
      [title, description, imgUrl, price, discountRate]
    );
  }
}
