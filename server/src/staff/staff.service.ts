import {db} from "../utils/db.server";

type Staff = {
    staff_pass_id: string
    team_name: string
    created_at: bigint
}

// Create staffs based on array of staffs provided, return successful creations only.
export const createManyStaffs = async (
    staffs: Staff[]
): Promise<Number> => {
    let count = 0; // for logging number of duplicates

    for (const staff of staffs) {
        const existingStaff = await db.staff.findUnique({
            where: { staff_pass_id: staff.staff_pass_id },
            select: {
                staff_pass_id: true
            }
        });

        if (!existingStaff) {
            await db.staff.create({
                data: {
                    staff_pass_id: staff.staff_pass_id,
                    team_name: staff.team_name,
                    created_at: staff.created_at
                },
                select: {
                    staff_pass_id: true,
                    team_name: true,
                    created_at: true
                }
            });
        } else {
            count += 1;
        }
    }
    return count;
}

export const getTeamName = async (staff_pass_id: string): Promise<string> => {
    if (!staff_pass_id) {
        throw new Error(`Invalid staff_pass_id provided: ${staff_pass_id}`);
    }
    const staff = await db.staff.findUnique({
        where: { staff_pass_id }, // Equivalent to { staff_pass_id: staff_pass_id }
        select: {
            team_name: true
        }
    });
    if (!staff || !staff.team_name) {
        throw new Error(`Staff with staff_pass_id ${staff_pass_id} not found`);
    }
    return staff.team_name;
}



export const deleteAllStaff = async (): Promise<void> => {
    const deleteStaffs = db.staff.deleteMany();
    await db.$transaction([deleteStaffs])
}