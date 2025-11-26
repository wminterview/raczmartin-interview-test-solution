package borrowing

import (
	"library-api-go/internal/dto"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type BorrowRequest struct {
	BorrowerName string `json:"borrower_name" binding:"required"`
}

type borrowingHandler struct {
	borrowingService BorrowingService
}

func NewBorrowingHandler(borrowingService BorrowingService) *borrowingHandler {
	return &borrowingHandler{borrowingService}
}

func (h *borrowingHandler) List(c *gin.Context) {
	borrowings, err := h.borrowingService.GetActiveBorrowings()
	if err != nil {
		c.JSON(http.StatusInternalServerError, dto.ErrorResponse{
			Error:   "Failed to fetch borrowings",
			Message: err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, borrowings)
}

func (h *borrowingHandler) Borrow(c *gin.Context) {
	idParam := c.Param("id")
	id64, err := strconv.ParseUint(idParam, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, dto.ErrorResponse{
			Error:   "Ivalid ID",
			Message: err.Error(),
		})
		return
	}

	var req BorrowRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, dto.ErrorResponse{
			Error:   "Ivalid request",
			Message: err.Error(),
		})
		return
	}

	borrowing, err := h.borrowingService.BorrowBook(uint(id64), req.BorrowerName)
	if err != nil {
		c.JSON(http.StatusBadRequest, dto.ErrorResponse{
			Error:   "Borrowing failed",
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, borrowing)
}

func (h *borrowingHandler) Return(c *gin.Context) {
	idParam := c.Param("id")
	id64, err := strconv.ParseUint(idParam, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, dto.ErrorResponse{
			Error:   "Ivalid ID",
			Message: err.Error(),
		})
		return
	}

	borrowing, err := h.borrowingService.ReturnBook(uint(id64))
	if err != nil {
		c.JSON(http.StatusBadRequest, dto.ErrorResponse{
			Error:   "Returning failed",
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, borrowing)
}