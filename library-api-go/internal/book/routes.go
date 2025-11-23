package book

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutes(r *gin.RouterGroup, db *gorm.DB) {
	bookRepository := NewBookRepository(db)
    bookService := NewBookService(bookRepository)    
    bookHandler := NewBookHandler(bookService)

	books := r.Group("/books")

    books.GET("", bookHandler.List)
    books.POST("", bookHandler.Create)
    //books.GET("/:id", handler.GetBook)
    //books.PUT("/:id", handler.UpdateBook)
    //books.DELETE("/:id", handler.DeleteBook)
    //books.POST("/:id/borrow", handler.BorrowBook)
    //books.POST("/:id/return", handler.ReturnBook)
}