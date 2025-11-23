package main

import (
	"log"
	"os"

	"library-api-go/internal/book"
	"library-api-go/internal/database"

	"github.com/gin-gonic/gin"
)

func main() {

    db, err := database.Connect()
    if err != nil {
        log.Fatalf("failed to connect to db: %v", err)
    }

    log.Println("Successfully connected to the database")

    // run migrations and seed
    if err := database.Migrate(db); err != nil {
        log.Fatalf("migration failed: %v", err)
    }

    // Close underlying sql.DB when main exits
    sqlDB, err := db.DB()
    if err == nil {
        defer sqlDB.Close()
    }

    log.Println("Database connected and migrated")

    // start HTTP server
    router := gin.Default()
    api := router.Group("/api") // central API prefix

    book.RegisterRoutes(api, db)
    //handlers.RegisterRoutes(router, db)

    port := "8080"
    if p := os.Getenv("PORT"); p != "" {
        port = p
    }

    addr := ":" + port
    log.Printf("starting server on %s", addr)
    if err := router.Run(addr); err != nil {
        log.Fatalf("server failed: %v", err)
    }
}