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
	GetAllBooks(search string) ([]models.Book, error)
	GetBook(id uint) (models.Book, error)
	CreateBook(input CreateBookInput) (models.Book, error)
	UpdateBook(id uint, input CreateBookInput) (models.Book, error)
}

type bookService struct {
	bookRepository BookRepository
}

func NewBookService(bookRepository BookRepository) BookService {
	return &bookService{bookRepository}
}

func (s *bookService) GetAllBooks(search string) ([]models.Book, error) {
	return s.bookRepository.GetAll(search)
}

func (s *bookService) CreateBook(input CreateBookInput) (models.Book, error) {
	book := &models.Book{
		Title:     input.Title,
		Author: input.Author,
		ISBN:   input.ISBN,
		Year:   input.Year,
		Available: true,
	}
	createdBook, err := s.bookRepository.Create(*book)
	if err != nil {
		return models.Book{}, err
	}
	return createdBook, nil
}

func (s *bookService) GetBook(id uint) (models.Book, error) {
	return s.bookRepository.GetByID(id)
}

func (s *bookService) UpdateBook(id uint, input CreateBookInput) (models.Book, error) {
	// fetch existing
	book, err := s.bookRepository.GetByID(id)
	if err != nil {
		return models.Book{}, err
	}

	book.Title = input.Title
	book.Author = input.Author
	book.ISBN = input.ISBN
	book.Year = input.Year

	updated, err := s.bookRepository.Update(book)
	if err != nil {
		return models.Book{}, err
	}
	return updated, nil
}
