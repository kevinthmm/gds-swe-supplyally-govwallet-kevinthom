/*
  Warnings:

  - You are about to alter the column `created_at` on the `Staff` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `redeemed_at` on the `Redemption` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Staff" (
    "staff_pass_id" TEXT NOT NULL PRIMARY KEY,
    "team_name" TEXT NOT NULL,
    "created_at" BIGINT NOT NULL
);
INSERT INTO "new_Staff" ("created_at", "staff_pass_id", "team_name") SELECT "created_at", "staff_pass_id", "team_name" FROM "Staff";
DROP TABLE "Staff";
ALTER TABLE "new_Staff" RENAME TO "Staff";
CREATE TABLE "new_Redemption" (
    "team_name" TEXT NOT NULL PRIMARY KEY,
    "redeemed_by" TEXT NOT NULL,
    "redeemed_at" BIGINT NOT NULL
);
INSERT INTO "new_Redemption" ("redeemed_at", "redeemed_by", "team_name") SELECT "redeemed_at", "redeemed_by", "team_name" FROM "Redemption";
DROP TABLE "Redemption";
ALTER TABLE "new_Redemption" RENAME TO "Redemption";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
