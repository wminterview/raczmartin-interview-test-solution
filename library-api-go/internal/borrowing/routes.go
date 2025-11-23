package borrowing

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutes(r *gin.RouterGroup, db *gorm.DB) {
	borrowingRepository := NewBorrowingRepository(db)
	borrowingService := NewBorrowingService(borrowingRepository)
	borrowingHandler := NewBorrowingHandler(borrowingService)
	borrowings := r.Group("/borrowings")

	borrowings.GET("", borrowingHandler.List)

}