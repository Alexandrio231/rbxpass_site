/*
  Warnings:

  - Added the required column `game_id` to the `Code` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "icon_url" TEXT,
    "description" TEXT,
    "requires_gamepass" BOOLEAN NOT NULL DEFAULT false,
    "activation_url_template" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- Create default Roblox game first
INSERT INTO "Game" ("name", "slug", "category", "requires_gamepass", "is_active", "created_at", "updated_at") 
VALUES ('Roblox', 'roblox', 'robux', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Code" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "game_id" INTEGER,
    "nominal" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "used_at" DATETIME,
    "reserved_at" DATETIME,
    "reserved_until" DATETIME,
    CONSTRAINT "Code_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
-- Migrate existing codes to Roblox game (id = 1)
INSERT INTO "new_Code" ("code", "id", "nominal", "status", "used_at", "game_id") 
SELECT "code", "id", "nominal", "status", "used_at", 1 FROM "Code";
DROP TABLE "Code";
ALTER TABLE "new_Code" RENAME TO "Code";
CREATE UNIQUE INDEX "Code_code_key" ON "Code"("code");
CREATE INDEX "Code_code_idx" ON "Code"("code");
CREATE INDEX "Code_game_id_idx" ON "Code"("game_id");
CREATE INDEX "Code_status_idx" ON "Code"("status");
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "short_code" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "telegram" TEXT,
    "user_id" TEXT NOT NULL,
    "game_id" INTEGER,
    "gamepass_id" TEXT,
    "gamepass_url" TEXT,
    "status" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Order_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("code", "created_at", "gamepass_id", "gamepass_url", "id", "nickname", "short_code", "status", "telegram", "updated_at", "user_id") SELECT "code", "created_at", "gamepass_id", "gamepass_url", "id", "nickname", "short_code", "status", "telegram", "updated_at", "user_id" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_short_code_key" ON "Order"("short_code");
CREATE INDEX "Order_code_idx" ON "Order"("code");
CREATE INDEX "Order_short_code_idx" ON "Order"("short_code");
CREATE INDEX "Order_status_idx" ON "Order"("status");
CREATE INDEX "Order_game_id_idx" ON "Order"("game_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Game_name_key" ON "Game"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Game_slug_key" ON "Game"("slug");

-- CreateIndex
CREATE INDEX "Game_slug_idx" ON "Game"("slug");

-- CreateIndex
CREATE INDEX "Game_category_idx" ON "Game"("category");

-- CreateIndex
CREATE INDEX "Game_is_active_idx" ON "Game"("is_active");
