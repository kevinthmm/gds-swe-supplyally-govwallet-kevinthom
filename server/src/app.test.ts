import superTest from "supertest";
import {staffRouter} from "./staff/staff.router";

describe("POST /staffs", () => {
    // Test 1: Given an empty array, should respond with a 200 status code
    describe("given a valid staffs array", () => {
        test("should respond with a 200 status code", async () => {
            const staffs = [
                {
                    "staff_pass_id": "STAFF_H123804820G",
                    "team_name": "BASS",
                    "created_at": 1623772799000
                },
                {
                    "staff_pass_id": "MANAGER_T999888420B",
                    "team_name": "RUST",
                    "created_at": 1623772799000
                },
                {
                    "staff_pass_id": "BOSS_T000000001P",
                    "team_name": "RUST",
                    "created_at": 1623772799000
                }
            ]
            const response = await superTest(staffRouter).post("/").send(staffs);
            expect(response.statusCode).toBe(200);
        });
    });
});