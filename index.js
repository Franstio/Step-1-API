import express from "express";
import ScannerRoute from "./routes/ScannerRoute.js";
import db from "./config/db.js";
import cors from  "cors";
import http from 'http';
import { Server } from "socket.io";
import bodyParser from "body-parser";
import { UpdateStatus } from "./controllers/Employee.js";
import { config } from "dotenv";
config();
const app = express();
const server = http.createServer(app);
const port = 5010;
 app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
/*  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers*/
  credentials:false 
}));


const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(bodyParser.json());

try {
  await db.authenticate();
  console.log('Database terhubung..');
  
} catch (error) {
  console.error(error);
  
}
app.use(ScannerRoute);

server.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});

export {io};