import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number; // optional, default 5
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  const pageNumbers: number[] = [];

  // Determine start and end page numbers
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const buttonClass = (isActive: boolean) =>
    `px-2 py-1 sm:px-3 sm:py-1 border rounded text-sm sm:text-base ${
      isActive ? "bg-blue-500 text-white" : ""
    }`;

  return (
    <div className="flex items-center space-x-2 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 py-1 sm:px-3 sm:py-1 border rounded disabled:opacity-50 text-sm sm:text-base`}
      >
        {"<"}
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={buttonClass(false)}
          >
            1
          </button>
          {startPage > 2 && <span className="px-1 sm:px-2">...</span>}
        </>
      )}

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={buttonClass(num === currentPage)}
        >
          {num}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-1 sm:px-2">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={buttonClass(false)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 sm:px-3 sm:py-1 border rounded disabled:opacity-50 text-sm sm:text-base`}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
