package borrowing

import (
	"errors"
	"time"

	"library-api-go/internal/models"

	"gorm.io/gorm"
)

type BorrowingRepository interface {
	GetAll() ([]models.Borrowing, error)
	Borrow(bookID uint, borrowerName string) (models.Borrowing, error)
	Return(bookID uint) (models.Borrowing, error)
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

func (r *borrowingRepository) Borrow(bookID uint, borrowerName string) (models.Borrowing, error) {
	var borrowing models.Borrowing

	err := r.db.Transaction(func(tx *gorm.DB) error {
		var book models.Book
		if err := tx.First(&book, bookID).Error; err != nil {
			return err
		}
		if !book.Available {
			return errors.New("book not available")
		}

		borrowing = models.Borrowing{
			BookID:       book.ID,
			BorrowerName: borrowerName,
			BorrowDate:   time.Now().UTC(),
		}

		if err := tx.Create(&borrowing).Error; err != nil {
			return err
		}

		book.Available = false
		if err := tx.Save(&book).Error; err != nil {
			return err
		}

		return nil
	})

	return borrowing, err
}

func (r *borrowingRepository) Return(bookID uint) (models.Borrowing, error) {
	var borrowing models.Borrowing

	err := r.db.Transaction(func(tx *gorm.DB) error {
		var book models.Book
		if err := tx.First(&book, bookID).Error; err != nil {
			return err
		}

		if err := tx.Where("book_id = ? AND return_date IS NULL", book.ID).First(&borrowing).Error; err != nil {
			return err
		}

		now := time.Now().UTC()
		borrowing.ReturnDate = &now
		if err := tx.Save(&borrowing).Error; err != nil {
			return err
		}

		book.Available = true
		if err := tx.Save(&book).Error; err != nil {
			return err
		}

		return nil
	})

	return borrowing, err
}
