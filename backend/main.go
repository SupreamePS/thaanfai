package main

import (
	"backend/internal/database"
	"backend/internal/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize Database (loads .env and connects)
	database.InitDB()

	r := gin.Default()

	// CORS configuration
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "OPTIONS"}
	r.Use(cors.New(config))

	api := r.Group("/api")
	{
		api.POST("/bookings", handlers.CreateBooking)
		api.GET("/bookings", handlers.GetBookings)
	}

	r.Run(":8080")
}
