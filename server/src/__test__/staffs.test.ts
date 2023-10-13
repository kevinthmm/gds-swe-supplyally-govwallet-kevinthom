import {Staff} from "@prisma/client";
import request from "supertest";
import createServer from "../utils/server";
const app = createServer();

describe('Staffs', () => {
    // Reset the database before each test
    beforeEach(async () => {
        // Delete all staffs
        await request(app).delete('/api/staffs').expect(200);
        // Add a staff
        const staff:Staff[] = [{
            staff_pass_id: "STAFF_H123804820G",
            team_name: "BASS",
            created_at: BigInt(1623772799000)
        }]
        const beforeBodyPackage = JSON.stringify(staff, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        await request(app).post('/api/staffs').send(beforeBodyPackage).set('Content-Type', 'application/json').expect(200);
    })
    // Clear the database after each test
    afterEach(async () => {
        await request(app).delete('/api/staffs').expect(200);
    })

    describe('POST /staffs', () => {

        // Test Regular Scenario
        describe('given a valid array of staffs', () => {
            const staffs:Staff[] = [
                {
                    staff_pass_id: "MANAGER_T999888420B",
                    team_name: "RUST",
                    created_at: BigInt(1623772799000)
                },
                {
                    staff_pass_id: "BOSS_T000000001P",
                    team_name: "RUST",
                    created_at: BigInt(1623872111000)
                }
            ]
            const bodyPackage = JSON.stringify(staffs, (_, v) => typeof v === 'bigint' ? v.toString() : v)
            it('should return 200 OK',  async () => {
                await request(app).post('/api/staffs').send(bodyPackage).set('Content-Type', 'application/json').expect(200);
            })
        })

        // Test duplicate scenario
        describe('given a duplicate array of staffs', () => {
            const staffs:Staff[] = [
                {
                    staff_pass_id: "STAFF_H123804820G",
                    team_name: "BASS",
                    created_at: BigInt(1623772799000)
                }
            ]
            const bodyPackage = JSON.stringify(staffs, (_, v) => typeof v === 'bigint' ? v.toString() : v)
            it('should return 409 Conflict',  async () => {
                await request(app).post('/api/staffs').send(bodyPackage).set('Content-Type', 'application/json').expect(409);
            })
        })

        // Test partial duplicate scenario
        describe('given a partial duplicate array of staffs', () => {
            const staffs:Staff[] = [
                {
                    staff_pass_id: "STAFF_H123804820G",
                    team_name: "BASS",
                    created_at: BigInt(1623772799000)
                },
                {
                    staff_pass_id: "MANAGER_T999888420B",
                    team_name: "RUST",
                    created_at: BigInt(1623772799000)
                },
                {
                    staff_pass_id: "BOSS_T000000001P",
                    team_name: "RUST",
                    created_at: BigInt(1623872111000)
                }
            ]
            const partialBody = JSON.stringify(staffs, (_, v) => typeof v === 'bigint' ? v.toString() : v)
            it('should return 207 Multi-Status',  async () => {
                await request(app).post('/api/staffs').send(partialBody).set('Content-Type', 'application/json').expect(207);
            })
        })
  })
    describe('DELETE /staffs', () => {
        describe('given a delete request to the /api/staffs endpoint', () => {
            it('should return 200 OK',  async () => {
                await request(app).delete('/api/staffs').expect(200);
            })
        })
    })
})