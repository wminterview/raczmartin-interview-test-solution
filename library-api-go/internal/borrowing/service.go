package borrowing

import "library-api-go/internal/models"

type BorrowingService interface {
	GetActiveBorrowings() ([]models.Borrowing, error)
	BorrowBook(bookID uint, borrowerName string) (models.Borrowing, error)
	ReturnBook(bookID uint) (models.Borrowing, error)
}

type borrowingService struct {
	borrowingRepository BorrowingRepository
}

func NewBorrowingService(borrowingRepository BorrowingRepository) BorrowingService {
	return &borrowingService{borrowingRepository}
}

func (s *borrowingService) GetActiveBorrowings() ([]models.Borrowing, error) {
	return s.borrowingRepository.GetAll()
}

func (s *borrowingService) BorrowBook(bookID uint, borrowerName string) (models.Borrowing, error) {
	return s.borrowingRepository.Borrow(bookID, borrowerName)
}

func (s *borrowingService) ReturnBook(bookID uint) (models.Borrowing, error) {
	return s.borrowingRepository.Return(bookID)
}