package book

import (
	"library-api-go/internal/models"
	"strings"

	"gorm.io/gorm"
)

type BookRepository interface {
    GetAll(search string, available *bool) ([]models.Book, error)
    GetByID(id uint) (models.Book, error)
    Create(book models.Book) (models.Book, error)
    Update(book models.Book) (models.Book, error)
    Delete(id uint) error
}

type bookRepository struct {
    db *gorm.DB
}

func NewBookRepository(db *gorm.DB) BookRepository {
	return &bookRepository{db}
}

func (r *bookRepository) GetAll(search string, available *bool) ([]models.Book, error) {
    var books []models.Book
    query := r.db

    // Apply availability filter when provided
    if available != nil {
        query = query.Where("available = ?", *available)
    }

    // Only filter by search if provided
    if search != "" {
        query = query.Where(
            "LOWER(title) LIKE ? OR LOWER(author) LIKE ?",
            "%"+strings.ToLower(search)+"%",
            "%"+strings.ToLower(search)+"%",
        )
    }

    if err := query.Find(&books).Error; err != nil {
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

func (r *bookRepository) GetByID(id uint) (models.Book, error) {
    var book models.Book
    if err := r.db.First(&book, id).Error; err != nil {
        return models.Book{}, err
    }
    return book, nil
}

func (r *bookRepository) Update(book models.Book) (models.Book, error) {
    if err := r.db.Save(&book).Error; err != nil {
        return models.Book{}, err
    }
    return book, nil
}

func (r *bookRepository) Delete(id uint) error {
    if err := r.db.Delete(&models.Book{}, id).Error; err != nil {
        return err
    }
    return nil
}