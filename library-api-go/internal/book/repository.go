package book

import (
	"library-api-go/internal/models"
	"strings"

	"gorm.io/gorm"
)

type BookRepository interface {
	GetAll(search string) ([]models.Book, error)
    GetByID(id uint) (models.Book, error)
    Create(book models.Book) (models.Book, error)
    Update(book models.Book) (models.Book, error)
}

type bookRepository struct {
    db *gorm.DB
}

func NewBookRepository(db *gorm.DB) BookRepository {
	return &bookRepository{db}
}

func (r *bookRepository) GetAll(search string) ([]models.Book, error) {
    var books []models.Book
    query := r.db

    // Only filter if a search query is provided
    if search != "" {
        query = query.Where(
            "LOWER(title) LIKE ? OR LOWER(author) LIKE ?", 
            "%"+strings.ToLower(search)+"%", 
            "%"+strings.ToLower(search)+"%",
        )
    }

    // If search == "", this just fetches all books
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