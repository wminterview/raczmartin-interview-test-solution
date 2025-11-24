export type BookCategory =
  | "Fiction"
  | "Science"
  | "History"
  | "Technology"
  | "Biography";

export const categories: BookCategory[] = [
  "Fiction",
  "Science",
  "History",
  "Technology",
  "Biography",
] as const;

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  year: number;
  available: boolean;
  category: BookCategory;
  description?: string;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: "user" | "admin";
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BooksResponse {
  success: boolean;
  data: {
    books: Book[];
    pagination: Pagination;
  };
  message: string;
}

export type FormValues = {
  title: string;
  author: string;
  isbn?: string;
  year?: number;
  category: BookCategory;
  description?: string;
};
