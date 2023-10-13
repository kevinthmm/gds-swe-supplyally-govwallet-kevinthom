import {Staff} from "@prisma/client";
import request from "supertest";
import createServer from "../utils/server";

const app = createServer();

describe('Redemptions', () => {
    // Reset the database before each test
    beforeEach(async () => {
        // Delete all redemptions
        await request(app).delete('/api/redemption').expect(200);
        // Delete all staffs
        await request(app).delete('/api/staffs').expect(200);
        // Add a single staff
        const staff:Staff[] = [{
            staff_pass_id: "STAFF_H123804820G",
            team_name: "BASS",
            created_at: BigInt(1623772799000)
        }]
        const beforeBodyPackage = JSON.stringify(staff, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        await request(app).post('/api/staffs').send(beforeBodyPackage).set('Content-Type', 'application/json').expect(200);
    })
    // Clear the tables after each test
    afterEach(async () => {
        // Clear redemptions
        await request(app).delete('/api/redemption').expect(200);
        // Clear staffs
        await request(app).delete('/api/staffs').expect(200);
    })

    // GET: Test Redemption Endpoint
    describe('GET /redemptions', () => {
        it('should return 200 OK',  async () => {
            await request(app).get(`/api/redemption`).expect(200);
        })
    })

    // POST /redemptions
    describe('POST /redemptions', () => {
        // Test Regular Scenario, where team has not redeemed
        describe('given a valid staff_pass_id', () => {
            const staff_pass_id: string = "STAFF_H123804820G"
            it('should return 200 OK',  async () => {
                await request(app).post(`/api/redemption`)
                    .send({staff_pass_id: staff_pass_id})
                    .set('Content-Type', 'application/json')
                    .expect(200);
            })
        })
        // Test Regular Scenario, where team has already redeemed
        describe('given a valid staff_pass_id whose team has already REDEEMED', () => {
            const staff_pass_id: string = "STAFF_H123804820G"
            it('should return 500 Internal Server Error',  async () => {
                await request(app).post(`/api/redemption`)
                    .send({staff_pass_id: staff_pass_id})
                    .set('Content-Type', 'application/json')
                    .expect(200);
                await request(app).post(`/api/redemption`)
                    .send({staff_pass_id: staff_pass_id})
                    .set('Content-Type', 'application/json')
                    .expect(409);
            })
        })
        // Test Regular Scenario, where staff_pass_id does not exist
        describe('given an invalid staff_pass_id', () => {
            const staff_pass_id: string = "IMPOSTER_H123804820G"
            it('should return 404 Not Found',  async () => {
                await request(app).post(`/api/redemption`)
                    .send({staff_pass_id: staff_pass_id})
                    .set('Content-Type', 'application/json')
                    .expect(404);
            })
        })
    })
})