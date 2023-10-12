import {db} from "../utils/db.server";
import {Prisma} from "@prisma/client";

type Redemption = {
    team_name: string,
    redeemed_by: string,
    redeemed_at: bigint,
}

// GET: Get redemption based on team_name
export const getRedemption = async (team_name: string): Promise<Redemption> => {
    if (!team_name) {
        throw new Error(`Invalid team_name provided: ${team_name}`);
    }
    const redemptions = await db.redemption.findUnique({
        where: { team_name: team_name },
        select: {
            team_name: true,
            redeemed_by: true,
            redeemed_at: true
        }
    });
    if (!redemptions) {
        throw new Error(`Redemption with team_name ${team_name} not found`);
    }
    return redemptions;
}

//POST: Create redemption based team_name, returns OK if successful, gets details if already exists
export const createRedemption = async (team_name: string, redeemed_by: string, redeemed_at: bigint): Promise<void> => {
    try{
        // Create redemption based on team name
        await db.redemption.create({
            data: {
                team_name: team_name,
                redeemed_by: redeemed_by,
                redeemed_at: redeemed_at
            },
            select: {
                team_name: true,
                redeemed_by: true,
                redeemed_at: true
            }
        })
    }
    catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
            // Unique constraint violation
            throw new Error(`Redemption for team_name ${team_name} already exists`);
        }
        throw e;  // Re-throw other errors
    }
}

// DELETE: Clear Redemption Table
export const deleteAllRedemption = async (): Promise<void> => {
    const deleteRedemption = db.redemption.deleteMany();
    await db.$transaction([deleteRedemption])
}