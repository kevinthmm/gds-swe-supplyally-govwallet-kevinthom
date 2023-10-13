import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from "body-parser";
import {staffRouter} from "./staff/staff.router";
import {redemptionRouter} from "./redemption/redemption.router";

// Check if environment variables are set
dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}
// Set port to environment variable and create express app
const PORT: number = parseInt(process.env.PORT as string, 10);
const app:Express = express();
app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));

// API for staffs
app.use("/api/staffs", staffRouter);

// API for redemption
app.use("/api/redemption", redemptionRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});