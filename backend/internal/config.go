package internal

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
