package book

import (
	"log"

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
    //books.GET("", h.List)
    books.POST("", h.Create)
}

func (h *bookHandler) List(c *gin.Context) {
    books, err := h.bookService.GetAllBooks()
    if err != nil {
        c.JSON(500, gin.H{"error": "failed to fetch books"})
        return
    }
    log.Printf("List called: %d books found", len(books))
    c.JSON(200, books)
}

func (h *bookHandler) Create(c *gin.Context) {
}
