package borrowing

import "github.com/gin-gonic/gin"

type borrowingHandler struct {
	borrowingService BorrowingService
}

func NewBorrowingHandler(borrowingService BorrowingService) *borrowingHandler {
	return &borrowingHandler{borrowingService}
}

func (h *borrowingHandler) List(c *gin.Context) {
	borrowings, err := h.borrowingService.GetActiveBorrowings()
	if err != nil {
		c.JSON(500, gin.H{"error": "failed to fetch borrowings"})
		return
	}	
	c.JSON(200, borrowings)	
}