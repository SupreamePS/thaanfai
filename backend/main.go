package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Booking represents a reservation.
type Booking struct {
	ID        uint   `json:"id" gorm:"primaryKey"`
	Timestamp string `json:"timestamp"`
	Branch    string `json:"branch" binding:"required"`
	Date      string `json:"date" binding:"required"`
	Time      string `json:"time" binding:"required"`
	Guests    string `json:"guests" binding:"required"`
	Name      string `json:"name" binding:"required"`
	Phone     string `json:"phone" binding:"required"`
	Email     string `json:"email" binding:"required"`
	Status    string `json:"status"`
}

var db *gorm.DB

func main() {
	var err error
	// Try connecting with current user first
	dsn := "host=localhost user=" + os.Getenv("USER") + " dbname=ecommerce port=5432 sslmode=disable"

	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		// Fallback to 'postgres' user
		log.Println("Failed to connect as current user, trying 'postgres'...", err)
		dsn = "host=localhost user=postgres dbname=ecommerce port=5432 sslmode=disable"
		db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err != nil {
			log.Fatal("Failed to connect to database:", err)
		}
	}

	// Auto Migrate the schema
	if err := db.AutoMigrate(&Booking{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	r := gin.Default()

	// CORS configuration
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "OPTIONS"}
	r.Use(cors.New(config))

	api := r.Group("/api")
	{
		api.POST("/bookings", createBooking)
		api.GET("/bookings", getBookings)
	}

	r.Run(":8080")
}

func createBooking(c *gin.Context) {
	var newBooking Booking
	if err := c.ShouldBindJSON(&newBooking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set server-side fields
	newBooking.Timestamp = time.Now().Format(time.RFC3339)
	newBooking.Status = "pending"

	if result := db.Create(&newBooking); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusCreated, newBooking)
}

func getBookings(c *gin.Context) {
	var bookings []Booking
	if result := db.Find(&bookings); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, bookings)
}
