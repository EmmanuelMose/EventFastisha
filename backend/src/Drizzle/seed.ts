import db from "../Drizzle/db";
import {
  UsersTable,
  VenuesTable,
  EventsTable,
  BookingsTable,
  PaymentsTable,
  CustomerSupportTicketsTable,
} from "../Drizzle/schema";
import { eq } from "drizzle-orm";

async function seed() {
  try {
    console.log("Starting database seeding...");

    //users
    const users = await db
      .insert(UsersTable)
      .values([
        {
          firstName: "John",
          lastName: "Doe",
          email: "johndoe123@gmail.com",
          password: "@John2025",
          contactPhone: "+254712345678",
          address: "Nairobi, Kenya",
          role: "admin",
          isVerified: true,
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          email: "janesmith@gmail.com",
          password: "@Jane2025",
          contactPhone: "+254798765432",
          address: "Mombasa, Kenya",
          isVerified: true,
        },
        {
          firstName: "Alice",
          lastName: "Wanjiku",
          email: "alicewanjiku@gmail.com",
          password: "@Wanjiku2025",
          contactPhone: "+254701234567",
          address: "Nakuru, Kenya",
        },
        {
          firstName: "Bob",
          lastName: "Odhiambo",
          email: "bobodhiambo@gmail.com",
          password: "@Bob2025",
          contactPhone: "+254703456789",
          address: "Kisumu, Kenya",
        },
        {
          firstName: "David",
          lastName: "Kamau",
          email: "davidkamau@gmail.com",
          password: "@Kamau2025",
          contactPhone: "+254705678901",
          address: "Eldoret, Kenya",
        },
      ])
      .returning({
        userID: UsersTable.userID,
        email: UsersTable.email, 
      });

    console.log("Users inserted.");

    //venues
    const venues = await db
      .insert(VenuesTable)
      .values([
        {
          name: "KICC",
          address: "Nairobi CBD",
          capacity: 5000,
          contactNumber: "+254700111222",
        },
        {
          name: "Nyayo Stadium",
          address: "Nairobi West",
          capacity: 20000,
          contactNumber: "+254700222333",
        },
        {
          name: "Mombasa Sports Club",
          address: "Mombasa Town",
          capacity: 10000,
        },
        {
          name: "Nakuru Showground",
          address: "Nakuru City",
          capacity: 15000,
        },
        {
          name: "Eldoret Stadium",
          address: "Eldoret Town",
          capacity: 12000,
        },
      ])
      .returning({ venueID: VenuesTable.venueID });

    console.log("Venues inserted.");

   //events
    const now = new Date();
    const events = await db
      .insert(EventsTable)
      .values([
        {
          title: "Afro Beats Concert",
          description: "A night of amazing African music.",
          category: "Music",
          eventDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
          startTime: new Date(),
          endTime: new Date(now.getTime() + 3 * 60 * 60 * 1000),
          ticketPrice: "1500.00",
          totalTickets: 500,
          availableTickets: 500,
          venueID: venues[0].venueID,
        },
        {
          title: "Tech Expo 2025",
          description: "Showcasing the latest innovations.",
          category: "Technology",
          eventDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
          startTime: new Date(),
          endTime: new Date(now.getTime() + 5 * 60 * 60 * 1000),
          ticketPrice: "1000.00",
          totalTickets: 300,
          availableTickets: 300,
          venueID: venues[1].venueID,
        },
        {
          title: "Comedy Night",
          description: "Laugh your heart out with Kenya's best comedians.",
          category: "Entertainment",
          eventDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
          startTime: new Date(),
          endTime: new Date(now.getTime() + 2 * 60 * 60 * 1000),
          ticketPrice: "800.00",
          totalTickets: 200,
          availableTickets: 200,
          venueID: venues[2].venueID,
        },
        {
          title: "Startup Pitch Fest",
          description: "Young innovators present their startup ideas.",
          category: "Business",
          eventDate: new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000),
          startTime: new Date(),
          endTime: new Date(now.getTime() + 4 * 60 * 60 * 1000),
          ticketPrice: "1200.00",
          totalTickets: 400,
          availableTickets: 400,
          venueID: venues[3].venueID,
        },
        {
          title: "Food & Culture Festival",
          description: "Taste foods and experience traditions across Kenya.",
          category: "Culture",
          eventDate: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000),
          startTime: new Date(),
          endTime: new Date(now.getTime() + 6 * 60 * 60 * 1000),
          ticketPrice: "500.00",
          totalTickets: 1000,
          availableTickets: 1000,
          venueID: venues[4].venueID,
        },
      ])
      .returning({ eventID: EventsTable.eventID });

    console.log("Events inserted.");

    //bookings
    const bookings = await db
      .insert(BookingsTable)
      .values([
        {
          userID: users[0].userID,
          eventID: events[0].eventID,
          numberOfTickets: 2,
          totalAmount: "3000.00",
        },
        {
          userID: users[1].userID,
          eventID: events[1].eventID,
          numberOfTickets: 3,
          totalAmount: "3000.00",
        },
        {
          userID: users[2].userID,
          eventID: events[2].eventID,
          numberOfTickets: 1,
          totalAmount: "800.00",
        },
        {
          userID: users[3].userID,
          eventID: events[3].eventID,
          numberOfTickets: 4,
          totalAmount: "4800.00",
        },
        {
          userID: users[4].userID,
          eventID: events[4].eventID,
          numberOfTickets: 5,
          totalAmount: "2500.00",
        },
      ])
      .returning({ bookingID: BookingsTable.bookingID });

    console.log("✅ Bookings inserted.");

    //payments
    await db.insert(PaymentsTable).values([
      {
        bookingID: bookings[0].bookingID,
        userID: users[0].userID,
        amount: "3000.00",
        paymentStatus: "Completed",
        paymentMethod: "M-Pesa",
      },
      {
        bookingID: bookings[1].bookingID,
        userID: users[1].userID,
        amount: "3000.00",
        paymentStatus: "Pending",
        paymentMethod: "Card",
      },
      {
        bookingID: bookings[2].bookingID,
        userID: users[2].userID,
        amount: "800.00",
        paymentStatus: "Completed",
        paymentMethod: "Cash",
      },
      {
        bookingID: bookings[3].bookingID,
        userID: users[3].userID,
        amount: "4800.00",
        paymentStatus: "Failed",
        paymentMethod: "Bank Transfer",
      },
      {
        bookingID: bookings[4].bookingID,
        userID: users[4].userID,
        amount: "2500.00",
        paymentStatus: "Refunded",
        paymentMethod: "PayPal",
      },
    ]);

    console.log("✅ Payments inserted.");

   //customer support ticket
    await db.insert(CustomerSupportTicketsTable).values([
      {
        userID: users[0].userID,
        email: users[0].email,
        subject: "Issue with booking confirmation",
        description: "I didn’t receive my booking email.",
      },
      {
        userID: users[1].userID,
        email: users[1].email,
        subject: "Payment pending too long",
        description: "My payment status is still pending.",
      },
      {
        userID: users[2].userID,
        email: users[2].email,
        subject: "Event postponed?",
        description: "I heard the event was postponed.",
      },
      {
        userID: users[3].userID,
        email: users[3].email,
        subject: "Refund request",
        description: "Please refund my ticket.",
      },
      {
        userID: users[4].userID,
        email: users[4].email,
        subject: "Update profile picture",
        description: "How can I change my profile photo?",
      },
    ]);

    console.log("Customer support tickets inserted.");
    console.log("🎉 Seeding completed successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

seed();
