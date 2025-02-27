# Event Booking App

This is an event booking application that allows users to book seats for events, view upcoming and past bookings, and more. The application is built with the following technologies:

- **Frontend**: Next.js
- **Backend**: NestJS, MySQL
- **Mobile App**: React Native (Expo)
- **Authentication**: OTP-based login

## Features

### Web App
- Users can log in and sign up.
- Users can view upcoming and past bookings.
- Users can book individual seats for events.
- Admins can manage events and bookings.
- Organizations can book multiple seats with verification.

### Mobile App
- QR code scanning for event entry.
- Users receive a PDF with a QR code for easy event access.

### Admin Portal
- Admins can approve events.
- Admins can manage seat availability.

## Setup and Installation

### Prerequisites
- Node.js (for frontend and backend)
- MySQL (for database)
- Expo (for mobile app)

### Frontend (Web App)
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/new-project-name.git
    ```
2. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Run the development server:
    ```bash
    npm run dev
    ```

### Backend (API)
1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up your MySQL database and configure the `.env` file with your database connection settings.
4. Run the server:
    ```bash
    npm run start
    ```

### Mobile App (React Native)
1. Navigate to the mobile app directory:
    ```bash
    cd EventBookingApp
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the app using Expo:
    ```bash
    expo start
    ```

## Deployment

1. For deployment, you can deploy the web app using Vercel or Netlify, and the mobile app can be deployed using Expo or React Native CLI.
2. Use services like Heroku, Azure, or AWS for deploying the backend API.
