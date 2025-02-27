// import { NestFactory } from "@nestjs/core";
// import { AppModule } from "./app.module";
// import * as cors from "cors";

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Middleware CORS setup (Allow Next.js & React Native)
//   app.use(
//     cors({
//       origin: ["http://localhost:3000", "http://localhost:8081"], // Allow Next.js & Expo
//       credentials: true,
//     })
//   );

//   await app.listen(4000);
//   console.log("Backend running on http://localhost:4000");
// }
// bootstrap();

// import { NestFactory } from "@nestjs/core";
// import { AppModule } from "./app.module";
// import * as cors from "cors";
// import * as os from "os";

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule); // ✅ Fix: Pass the class reference, not a function

//   // Get Local Network IP
//   const getLocalIP = () => {
//     const interfaces = os.networkInterfaces();
//     for (const key in interfaces) {
//       for (const net of interfaces[key]!) {
//         if (net.family === "IPv4" && !net.internal) {
//           return net.address;
//         }
//       }
//     }
//     return "localhost"; // Fallback
//   };
//   const localIP = getLocalIP();

//   // Enable CORS for Web & Mobile Access
//   app.use(
//     cors({
//       origin: [
//         `http://${localIP}:3000`, // Next.js Frontend
//         `http://${localIP}:8081`, // Expo Web
//         `http://${localIP}:19000`, // Expo Devtools
//         `http://${localIP}:19006`, // Expo Go
//         "*", // Allow all (for testing)
//       ],
//       credentials: true,
//     })
//   );

//   // ✅ Accept connections from any device
//   await app.listen(4000, "0.0.0.0");
//   console.log(`🚀 Backend running at: http://${localIP}:4000`);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
}
bootstrap();
