package handlers

import (
	"backend/internal/database"
	"backend/internal/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func CreateBooking(c *gin.Context) {
	var newBooking models.Booking
	if err := c.ShouldBindJSON(&newBooking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set server-side fields
	newBooking.Timestamp = time.Now().Format(time.RFC3339)
	newBooking.Status = "pending"

	if result := database.DB.Create(&newBooking); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusCreated, newBooking)
}

func GetBookings(c *gin.Context) {
	var bookings []models.Booking
	if result := database.DB.Find(&bookings); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, bookings)
}
