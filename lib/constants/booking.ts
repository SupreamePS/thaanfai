export const BOOKING_CONSTANTS = {
    title: "Book a Table",
    subtitle: "Reserve your spot at the fire.",
    branches: [
        { id: "liabduan", name: "Liabduan Branch", address: "228/1 Soi Yothin Phatthana 7" },
        { id: "rama9", name: "Rama 9 Branch", address: "15 Rama9 Soi 45 SuanLuang" }
    ],
    timeSlots: [
        "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
        "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
    ],
    partySizes: [1, 2, 3, 4, 5, 6, 7, 8, "8+"],
    labels: {
        branch: "Select Branch",
        date: "Select Date",
        time: "Select Time",
        guests: "Number of Guests",
        name: "Your Name",
        phone: "Phone Number",
        email: "Email Address",
        submit: "Confirm Reservation"
    },
    successMessage: {
        title: "Reservation Received",
        description: "Thank you for booking with Thaanfai. We will confirm your table shortly via SMS/Email."
    }
};
