package book

import (
	"library-api-go/internal/dto"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type BookRequest struct {
    Title  string `json:"title" binding:"required"`
    Author string `json:"author" binding:"required"`
    ISBN   string `json:"isbn" binding:"required"`
    Year   int    `json:"year"  binding:"required,min=1900,max=2024"`
}

type bookHandler struct {
	bookService BookService
}

func NewBookHandler(bookService BookService) *bookHandler {
	return &bookHandler{bookService}
}

func (h *bookHandler) List(c *gin.Context) {
    search := c.Query("search")
    var available *bool
    if a := c.Query("available"); a != "" {
        if a == "true" {
            t := true
            available = &t
        } else if a == "false" {
            f := false
            available = &f
        }
    }

    books, err := h.bookService.GetAllBooks(search, available)
    if err != nil {
        c.JSON(http.StatusInternalServerError, dto.ErrorResponse{
			Error:   "Failed to fetch books",
			Message: err.Error(),
		})
        return
    }
    c.JSON(http.StatusOK, books)
}

func (h *bookHandler) Create(c *gin.Context) {
    var req BookRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, dto.ErrorResponse{
			Error:   "Ivalid request",
			Message: err.Error(),
		})
        return
    }

    input := CreateBookInput(req)
    created, err := h.bookService.CreateBook(input)
    if err != nil {
        c.JSON(http.StatusInternalServerError, dto.ErrorResponse{
			Error:   "Failed to create book",
			Message: err.Error(),
		})
        return
    }
    c.JSON(http.StatusCreated, created)
}

func (h *bookHandler) Get(c *gin.Context) {
    idParam := c.Param("id")
    id64, err := strconv.ParseUint(idParam, 10, 64)
    if err != nil {
        c.JSON(http.StatusBadRequest, dto.ErrorResponse{
			Error:   "Ivalid ID",
			Message: err.Error(),
		})
        return
    }
    book, err := h.bookService.GetBook(uint(id64))
    if err != nil {
        c.JSON(http.StatusNotFound, dto.ErrorResponse{
			Error:   "Book not found",
			Message: err.Error(),
		})
        return
    }
    c.JSON(http.StatusOK, book)
}

func (h *bookHandler) Update(c *gin.Context) {
    idParam := c.Param("id")
    id64, err := strconv.ParseUint(idParam, 10, 64)
    if err != nil {
        c.JSON(http.StatusBadRequest, dto.ErrorResponse{
			Error:   "Ivalid ID",
			Message: err.Error(),
		})
        return
    }

    var req BookRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, dto.ErrorResponse{
			Error:   "Ivalid request",
			Message: err.Error(),
		})
        return
    }

    updated, err := h.bookService.UpdateBook(uint(id64), CreateBookInput(req))
    if err != nil {
        c.JSON(http.StatusInternalServerError, dto.ErrorResponse{
			Error:   "Failed to update book",
			Message: err.Error(),
		})
        return
    }

    c.JSON(http.StatusOK, updated)
}

func (h *bookHandler) Delete(c *gin.Context) {
    idParam := c.Param("id")
    id64, err := strconv.ParseUint(idParam, 10, 64)
    if err != nil {
        c.JSON(http.StatusBadRequest, dto.ErrorResponse{
			Error:   "Ivalid ID",
			Message: err.Error(),
		})
        return
    }

    if err := h.bookService.DeleteBook(uint(id64)); err != nil {
        c.JSON(http.StatusInternalServerError, dto.ErrorResponse{
			Error:   "Failed to delete book",
			Message: err.Error(),
		})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "book deleted"})
}
