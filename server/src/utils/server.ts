import express, {Express} from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import {staffRouter} from "../staff/staff.router";
import {redemptionRouter} from "../redemption/redemption.router";

function createServer(){
    const app:Express = express();
    app.use(cors());
    app.use(bodyParser.json({ limit: '2mb' }));

    // API for staffs
    app.use("/api/staffs", staffRouter);

    // API for redemption
    app.use("/api/redemption", redemptionRouter);

    return app;
}

export default createServer;