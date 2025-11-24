/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import type { Book } from "../../types";
import Loading from "../../components/UI/Loading";
import Pagination from "../../components/UI/Pagination";
import Input from "../../components/UI/Input";
import { getBooks } from "../../hooks/useBooks";
import { useQuery } from "@tanstack/react-query";
import BookList from "../../components/Books/BookList";

export default function BooksPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const pageSize = 5;

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading } = useQuery<any>({
    queryKey: ["books", page, debouncedSearch],
    queryFn: async () => {
      const res = await getBooks({
        page,
        limit: pageSize,
        search: debouncedSearch?.trim() || undefined,
      });
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60,
  } as any);

  const books: Book[] = data?.books ?? [];
  const totalBooks: number = data?.pagination?.total ?? books.length;
  const totalPages = Math.ceil(totalBooks / pageSize);

  return (
    <div className="flex flex-col gap-4 h-full p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4 shrink-0">Books</h1>
      <Input
        className="bg-white"
        placeholder="Search books"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <div className="flex-1 mb-4">
        {isLoading ? <Loading /> : <BookList books={books} />}
      </div>

      <div className="flex shrink-0 justify-center ">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          maxVisiblePages={3}
        />
      </div>
    </div>
  );
}
