package database

import (
    "log"

    "library-api-go/internal/models"

    "gorm.io/gorm"
)

// Migrate runs AutoMigrate and seeds sample data if needed.
func Migrate(db *gorm.DB) error {
    if err := db.AutoMigrate(&models.Book{}, &models.Borrowing{}); err != nil {
        return err
    }

    if err := seedBooks(db); err != nil {
        log.Println("seeding books failed:", err)
    }

    return nil
}

func seedBooks(db *gorm.DB) error {
    var count int64
    if err := db.Model(&models.Book{}).Count(&count).Error; err != nil {
        return err
    }
    if count > 0 {
        return nil
    }

    books := []models.Book{
        {Title: "The Go Programming Language", Author: "Alan A. A. Donovan", ISBN: "9780134190440", Year: 2015, Available: true},
        {Title: "Introducing Go", Author: "Caleb Doxsey", ISBN: "9781491941959", Year: 2016, Available: true},
        {Title: "Concurrency in Go", Author: "Katherine Cox-Buday", ISBN: "9781491941195", Year: 2017, Available: true},
        {Title: "Go in Action", Author: "William Kennedy", ISBN: "9781617291784", Year: 2015, Available: true},
        {Title: "Learning Go", Author: "Jon Bodner", ISBN: "9781492077213", Year: 2021, Available: true},
    }

    for _, b := range books {
        if err := db.Create(&b).Error; err != nil {
            log.Println("failed to create seed book:", err)
        }
    }

    return nil
}
