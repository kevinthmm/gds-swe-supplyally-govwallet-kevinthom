import {db} from "../src/utils/db.server";

type Staff = {
    staff_pass_id: string
    team_name: string
    created_at: bigint
};

function getStaff(): Array<Staff> {
    return [
        {
            staff_pass_id: 'STAFF_H123804820G',
            team_name: 'BASS',
            created_at: BigInt(1623772799000)
        },
        {
            staff_pass_id: 'MANAGER_T999888420B',
            team_name: 'RUST',
            created_at: BigInt(1623772799000)
        },
        {
            staff_pass_id: 'BOSS_T000000001P',
            team_name: 'RUST',
            created_at: BigInt(1623872111000)
        }
    ]
}

async function seed(): Promise<void> {
    await Promise.all(
        getStaff().map((staff) => {
            return db.staff.create({
                data: {
                    staff_pass_id: staff.staff_pass_id,
                    team_name: staff.team_name,
                    created_at: staff.created_at
                }
            })
        })
    )
}
seed();