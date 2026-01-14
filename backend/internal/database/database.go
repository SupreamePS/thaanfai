package database

import (
	"backend/internal/models"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	// Load .env file
	// We look for .env in the root directory (../.env relative to backend/, or just .env if running from root)
	// Since we are running from backend/, we try to load from parent directory or current
	if err := godotenv.Load("../.env"); err != nil {
		log.Println("No .env file found in parent directory, checking current directory")
		if err := godotenv.Load(); err != nil {
			log.Println("No .env file found")
		}
	}

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL environment variable is not set")
	}

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto Migrate the schema
	if err := DB.AutoMigrate(&models.Booking{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}
}
