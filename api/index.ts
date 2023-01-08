// This file must be in the /api folder for Vercel to detect it as a serverless function
import type { Request, Response } from "express";
import express from "express";
import http from "http";
import dotenv from "dotenv";
import api from "../server/api";

// Load environmental variables
dotenv.config({});

// Initalize an express app
const app = express();

// Set the port
// app.set("port", process.env.PORT || 3000);

// Parse incoming requests with JSON payloads ('content-type: application/json' in header)
app.use(express.json());

// Parse incoming requests with urlencoded payloads ('content-type: application/x-www-form-urlencoded' in header)
app.use(express.urlencoded({ extended: false }));

app.use("/api", api);

// Catch all the other routes and display error message
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    error: "Page not found",
  });
});

// Create server to listen to request at specified port
const server = http.createServer(app);
server.listen(process.env.PORT || 3000, () => {
  console.log(
    `Express server running at http://localhost:${process.env.PORT || 3000}`
  );
});
