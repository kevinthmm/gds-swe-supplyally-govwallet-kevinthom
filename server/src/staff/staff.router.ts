import express from "express";
import type {Request, Response} from "express";
import { body, validationResult } from "express-validator";
import * as staffService from "./staff.service";
import {Staff} from "@prisma/client";

export const staffRouter = express.Router();

// POST: Create staffs based on array of staffs provided, return successful creations only.
staffRouter.post("/", body().isString(), async (req: Request, res: Response):Promise<Response> => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({errors: errors.array()});
    // }
    const jsonBody = req.body;
    console.log(jsonBody)
    try{
        console.log(jsonBody);
        const staffs: Staff[] = req.body;
        // returns the results of the staffs created if successful
        const results:Number = await staffService.createManyStaffs(staffs);
        if (results === 0){
            return res.status(200).json({message: "OK: All Staffs created"});
        }
        else if (results === staffs.length){
            return res.status(403).json({message: "No Staffs created due to duplicates"});
        }
        else{
            return res.status(200).json({message: `${results} Staffs Skipped Duplicate Error`});
        }
    }catch (e) {
        return res.status(500).send(e.message);
    }
})

// DELETE: Delete all staffs
staffRouter.delete("/", async (req: Request, res: Response):Promise<Response> => {
    try{
        await staffService.deleteAllStaff();
        return res.status(200).json({message: `OK: Staffs Deleted`});
    }catch (e) {
        return res.status(500).send(e.message);
    }
})