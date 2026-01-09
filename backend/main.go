package main

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// Booking represents a reservation.
type Booking struct {
	ID        string `json:"id"`
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

var (
	bookings []Booking
	mu       sync.RWMutex
)

func main() {
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
	newBooking.ID = time.Now().Format("20060102150405") // Simple ID
	newBooking.Timestamp = time.Now().Format(time.RFC3339)
	newBooking.Status = "pending"

	mu.Lock()
	bookings = append([]Booking{newBooking}, bookings...) // Prepend
	mu.Unlock()

	c.JSON(http.StatusCreated, newBooking)
}

func getBookings(c *gin.Context) {
	mu.RLock()
	defer mu.RUnlock()

	// Return empty slice instead of null if empty
	if bookings == nil {
		c.JSON(http.StatusOK, []Booking{})
		return
	}

	c.JSON(http.StatusOK, bookings)
}
