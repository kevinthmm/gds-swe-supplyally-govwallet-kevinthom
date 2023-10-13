import express from "express";
import type {Request, Response} from "express";
import { body, validationResult } from "express-validator";
import * as redemptionService from "./redemption.service";
import {Redemption} from "@prisma/client";
import * as staffService from "../staff/staff.service";

export const redemptionRouter = express.Router();
//GET: Test Redemption Endpoint
redemptionRouter.get("/", async (req: Request, res: Response):Promise<Response> => {
    return res.status(200).json({message: `OK: Redemption Endpoint`});
})

// POST: Create redemption based on array of redemption provided, return successful creations only.
redemptionRouter.post("/",body("staff_pass_id").isString() ,async (req: Request, res: Response):Promise<Response> => {
    // Check for validation errors in the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    let team_name: string = ""
    let staff_pass_id: string = req.body.staff_pass_id;
    try {
        // First take the staff_pass_id to get the team_name
        team_name = await staffService.getTeamName(staff_pass_id);
    }catch (e) {
        return res.status(404).json({message: `Staff Pass ID ${staff_pass_id} not found`})
    }
    try{
        // Then create the redemption with the team_name
        await redemptionService.createRedemption(team_name, staff_pass_id, BigInt(Date.now()));
        return res.status(200).json({message: `OK: Redeemed Created`});
    }catch (e) {
        if (e.message === `Redemption for team_name ${team_name} already exists`){
            try {
                type returnRedemption = Omit<Redemption, 'redeemed_at'> & { redeemed_at: string };
                const redemptions: Redemption = await redemptionService.getRedemption(team_name);
                let existingRedemption: returnRedemption = {
                    team_name: redemptions.team_name,
                    redeemed_by: redemptions.redeemed_by,
                    redeemed_at: new Date(Number(redemptions.redeemed_at)).toLocaleString('en-GB')
                };
                return res.status(409).json({
                    message: `Team ${existingRedemption.team_name}'s gift was already redeemed by 
                    ${existingRedemption.redeemed_by} at ${existingRedemption.redeemed_at} Hrs`});
            }catch (e) {
                return res.status(500).json({message:e.message});
            }
        }
        return res.status(500).send(e.message);
    }
})

// DELETE: Clear Redemption Table
redemptionRouter.delete("/", async (req: Request, res: Response):Promise<Response> => {
    try{
        await redemptionService.deleteAllRedemption();
        return res.status(200).json({message: `OK: Redemption Deleted`});
    }catch (e) {
        return res.status(500).send(e.message);
    }
})