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
    books.GET("/:id", bookHandler.Get)
    books.PUT("/:id", bookHandler.Update)
    books.DELETE("/:id", bookHandler.Delete)
}