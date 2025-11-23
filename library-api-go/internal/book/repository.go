package book

import (
	"library-api-go/internal/models"

	"gorm.io/gorm"
)

type BookRepository interface {
	GetAll() ([]models.Book, error)
	Create(book models.Book) (models.Book, error)
}

type bookRepository struct {
	db* gorm.DB
}

func NewBookRepository(db *gorm.DB) BookRepository {
	return &bookRepository{db}
}

func (r *bookRepository) GetAll() ([]models.Book, error) {
	var books []models.Book
	if err := r.db.Find(&books).Error; err != nil {
		return nil, err
	}
	return books, nil
}

func (r *bookRepository) Create(book models.Book) (models.Book, error) {
	if err := r.db.Create(&book).Error; err != nil {
		return models.Book{}, err
	}
	return book, nil
}