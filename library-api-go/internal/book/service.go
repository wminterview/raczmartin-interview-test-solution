package book

import (
	"library-api-go/internal/models"
)

type CreateBookInput struct {
    Title  string
    Author string
    ISBN   string
    Year   int
}

type BookService interface {
	GetAllBooks() ([]models.Book, error)
	CreateBook(input CreateBookInput) (models.Book, error)
}

type bookService struct {
	bookRepository BookRepository
}

func NewBookService(bookRepository BookRepository) BookService {
	return &bookService{bookRepository}
}

func (s *bookService) GetAllBooks() ([]models.Book, error) {
	return s.bookRepository.GetAll()
}

func (s *bookService) CreateBook(input CreateBookInput) (models.Book, error) {
	book := &models.Book{
		Title:     input.Title,
		Author: input.Author,
		ISBN:   input.ISBN,
		Year:   input.Year,
		Available: true,
	}
	createdBook, err := s.bookRepository.Create(*book);
    if err != nil {
        return models.Book{}, err
    }
    return *&createdBook, nil
}
