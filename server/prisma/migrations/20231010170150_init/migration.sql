-- CreateTable
CREATE TABLE "Staff" (
    "staff_pass_id" TEXT NOT NULL PRIMARY KEY,
    "team_name" TEXT NOT NULL,
    "created_at" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Redemption" (
    "team_name" TEXT NOT NULL PRIMARY KEY,
    "redeemed_by" TEXT NOT NULL,
    "redeemed_at" INTEGER NOT NULL
);
