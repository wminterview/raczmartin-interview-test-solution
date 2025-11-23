package book

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CreateBookRequest struct {
	Title  string `json: "title" binding:"required"`
	Author string `json: "author" binding:"required"`
	ISBN   string `json: "isbn" binding:"required"`
	Year   int    `json: "year"  binding:"required,min=1900,max=2024"`
}

type bookHandler struct {
	bookService BookService
}

func NewBookHandler(bookService BookService) *bookHandler {
	return &bookHandler{bookService}
}

func (h *bookHandler) RegisterRoutes(r *gin.Engine) {
    books := r.Group("/books")
    books.GET("", h.List)
    books.POST("", h.Create)
    books.GET(":id", h.Get)
}

func (h *bookHandler) List(c *gin.Context) {
    search := c.Query("search")
    books, err := h.bookService.GetAllBooks(search)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch books"})
        return
    }
    c.JSON(http.StatusOK, books)
}

func (h *bookHandler) Create(c *gin.Context) {
    var req CreateBookRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request", "message": err.Error()})
        return
    }

    input := CreateBookInput{Title: req.Title, Author: req.Author, ISBN: req.ISBN, Year: req.Year}
    created, err := h.bookService.CreateBook(input)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create book"})
        return
    }
    c.JSON(http.StatusCreated, created)
}

func (h *bookHandler) Get(c *gin.Context) {
    idParam := c.Param("id")
    id64, err := strconv.ParseUint(idParam, 10, 64)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
        return
    }
    book, err := h.bookService.GetBook(uint(id64))
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "book not found"})
        return
    }
    c.JSON(http.StatusOK, book)
}
