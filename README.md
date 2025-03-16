📌 EVENT BOOKING SYSTEM 🎟️
A complete event booking application built with:
✅ Frontend: Next.js (Static Export)
✅ Backend: NestJS (REST API)
✅ Mobile App: React Native (Expo)
✅ Database: MySQL
✅ Authentication: OTP-based Login

🚀 Features
Web App (Next.js)
✅ User login & registration (OTP-based authentication)
✅ View upcoming & past bookings
✅ Book individual seats for events
✅ Admin panel to manage events & bookings
✅ Organizations can book multiple seats with verification

Mobile App (React Native)
📌 QR code scanning for event entry
📌 Users receive a PDF ticket with a QR code

Admin Portal (NestJS + MySQL)
🔹 Approve events
🔹 Manage seat availability
🔹 View all user bookings

🛠 Setup & Installation
1️⃣ Prerequisites
Before proceeding, ensure you have installed:

Node.js (for frontend & backend)
MySQL (for database)
Expo CLI (for mobile app development)
🖥 Frontend (Next.js) Setup
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

🖥 Backend (NestJS) Setup
sh
Copy
Edit
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure MySQL database in the `.env` file
touch .env
.env Configuration (Example)
ini
Copy
Edit
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=yourpassword
DB_NAME=event_booking
JWT_SECRET=your_secret_key
sh
Copy
Edit
# Run database migrations (if applicable)
npm run migration:run

# Start the backend server
npm run start
The backend will run at http://localhost:5000

📱 Mobile App (React Native with Expo) Setup
sh
Copy
Edit
# Navigate to the mobile app directory
cd EventBookingApp

# Install dependencies
npm install

# Run the app using Expo
expo start
Scan the QR code with an Expo Go app or use an emulator.

🚀 Deployment
1️⃣ Deploying Frontend on GitHub Pages
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

2️⃣ Deploying Backend on Heroku / AWS / Azure
Example for Heroku deployment:

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
heroku config:set DB_HOST=your_db_host DB_USER=root DB_PASS=yourpassword DB_NAME=event_booking JWT_SECRET=your_secret_key

# Open the live backend URL
heroku open
3️⃣ Deploying Mobile App on Play Store / App Store
Use Expo EAS Build to generate APK/IPA files
Example:
sh
Copy
Edit
# Install Expo CLI
npm install -g eas-cli

# Login to Expo
eas login

# Initialize EAS
eas init

# Build APK for Android
eas build -p android --profile production

# Build IPA for iOS
eas build -p ios --profile production
Publish to Play Store / App Store using Google Play Console or Apple Developer Account.
📜 API Endpoints (Backend - NestJS)
Method	Endpoint	Description
POST	/auth/register	Register new user
POST	/auth/login	Login with OTP
GET	/events	Get all events
POST	/events/create	Create new event (Admin only)
POST	/bookings	Book a seat for an event
GET	/bookings/:userId	Get user’s bookings
🛠 Troubleshooting
GitHub Pages Not Loading?
✔️ Check if basePath and assetPrefix are correctly set in next.config.js.
✔️ Run:

sh
Copy
Edit
npm run build
npm run export
npm run deploy
Database Connection Issues?
✔️ Verify MySQL service is running:

sh
Copy
Edit
sudo service mysql start
✔️ Check if database credentials in .env file are correct.

Mobile App QR Code Not Working?
✔️ Ensure Expo Go app is installed on your mobile.
✔️ Try running:

sh
Copy
Edit
expo start --clear
🤝 Contributing
Want to improve this project?
1️⃣ Fork the repository
2️⃣ Create a new branch (git checkout -b feature-branch)
3️⃣ Commit your changes (git commit -m "Added new feature")
4️⃣ Push to your fork (git push origin feature-branch)
5️⃣ Open a Pull Request

📄 License
This project is open-source and available under the MIT License.

👨‍💻 Author
Developed by Chandan 🚀

