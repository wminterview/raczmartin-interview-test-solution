package borrowing

import "library-api-go/internal/models"

type BorrowingService interface {
	GetActiveBorrowings() ([]models.Borrowing, error)
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