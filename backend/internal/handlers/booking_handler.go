package handlers

import (
	"backend/internal/database"
	"backend/internal/models"
	"context"
	"log"
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

	query := `
		INSERT INTO bookings (timestamp, branch, date, time, guests, name, phone, email, status)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
		RETURNING id
	`

	err := database.DB.QueryRow(context.Background(), query,
		newBooking.Timestamp,
		newBooking.Branch,
		newBooking.Date,
		newBooking.Time,
		newBooking.Guests,
		newBooking.Name,
		newBooking.Phone,
		newBooking.Email,
		newBooking.Status,
	).Scan(&newBooking.ID)

	if err != nil {
		log.Println("Error inserting booking:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create booking"})
		return
	}

	c.JSON(http.StatusCreated, newBooking)
}

func GetBookings(c *gin.Context) {
	query := `SELECT id, timestamp, branch, date, time, guests, name, phone, email, status FROM bookings ORDER BY id DESC`

	rows, err := database.DB.Query(context.Background(), query)
	if err != nil {
		log.Println("Error querying bookings:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch bookings"})
		return
	}
	defer rows.Close()

	var bookings []models.Booking
	for rows.Next() {
		var b models.Booking
		err := rows.Scan(
			&b.ID,
			&b.Timestamp,
			&b.Branch,
			&b.Date,
			&b.Time,
			&b.Guests,
			&b.Name,
			&b.Phone,
			&b.Email,
			&b.Status,
		)
		if err != nil {
			log.Println("Error scanning booking row:", err)
			continue
		}
		bookings = append(bookings, b)
	}

	// Ensure empty slice is returned instead of null
	if bookings == nil {
		bookings = []models.Booking{}
	}

	c.JSON(http.StatusOK, bookings)
}
