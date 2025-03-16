EVENT-BOOKING-SYSTEM 🎟️
A complete event booking application

Technologies Used
Frontend: Next.js
Backend: NestJS, MySQL
Mobile App: React Native (Expo)
Authentication: OTP-based login
Features 🚀
Web App
✅ User login & registration
✅ View upcoming & past bookings
✅ Book individual seats for events
✅ Admins can manage events & bookings
✅ Organizations can book multiple seats with verification

Mobile App
📌 QR code scanning for event entry
📌 Users receive a PDF ticket with a QR code

Admin Portal
🔹 Admins can approve events
🔹 Manage seat availability

Setup and Installation 🛠️
1️⃣ Prerequisites
Ensure you have the following installed:
✔️ Node.js (for frontend & backend)
✔️ MySQL (for database)
✔️ Expo CLI (for mobile app)

2️⃣ Frontend (Web App) Setup
sh
Copy
Edit
# Clone the repository
git clone https://github.com/chandanlog/EVENT-BOOKING-SYSTEM.git

# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
The web app will be available at http://localhost:3000

3️⃣ Backend (API) Setup
sh
Copy
Edit
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure MySQL database in the .env file
# Example .env
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=event_booking

# Start the backend server
npm run start
The backend will run at http://localhost:5000

4️⃣ Mobile App (React Native) Setup
sh
Copy
Edit
# Navigate to mobile app directory
cd EventBookingApp

# Install dependencies
npm install

# Run the app using Expo
expo start
Scan the QR code with an Expo app or use an emulator.

Deployment 🚀
1️⃣ Deploying the Frontend on GitHub Pages
Update next.config.js (inside frontend/ directory)
js
Copy
Edit
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/EVENT-BOOKING-SYSTEM", // Your repo name
  assetPrefix: "/EVENT-BOOKING-SYSTEM/",
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
Build & Deploy
sh
Copy
Edit
cd frontend
npm install
npm run build
npm run export
npm run deploy
Your site will be live at:
➡️ https://chandanlog.github.io/EVENT-BOOKING-SYSTEM/

2️⃣ Deploying the Backend on Heroku / AWS / Azure
Use Heroku, AWS, or Railway to deploy the NestJS backend. Example for Heroku:

sh
Copy
Edit
# Login to Heroku
heroku login

# Create a Heroku app
heroku create event-booking-backend

# Push the backend to Heroku
git push heroku main

# Set environment variables
heroku config:set DB_HOST=your_db_host DB_USER=root DB_PASS=yourpassword DB_NAME=event_booking

# Open the live backend URL
heroku open
Contributing 🤝
Contributions are welcome! Follow these steps:

Fork the repository
Create a new branch (git checkout -b feature-branch)
Commit your changes (git commit -m "Added new feature")
Push to your fork (git push origin feature-branch)
Open a Pull Request
