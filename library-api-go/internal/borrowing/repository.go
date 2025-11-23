package borrowing

import (
	"library-api-go/internal/models"

	"gorm.io/gorm"
)

type BorrowingRepository interface {
	GetAll() ([]models.Borrowing, error)
}

type borrowingRepository struct {
	db *gorm.DB
}

func NewBorrowingRepository(db *gorm.DB) BorrowingRepository {
	return &borrowingRepository{db}
}

func (r *borrowingRepository) GetAll() ([]models.Borrowing, error) {
	var borrowings []models.Borrowing
	if err := r.db.Preload("Book").Where("return_date IS NULL").Find(&borrowings).Error; err != nil {
		return nil, err
	}

	return borrowings, nil

}
