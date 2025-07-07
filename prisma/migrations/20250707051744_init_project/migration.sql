/*
  Warnings:

  - You are about to drop the `project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "project";

-- CreateTable
CREATE TABLE "portfolio_project" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(55) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "technology" TEXT[],
    "link" TEXT NOT NULL,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "preview" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portfolio_project_pkey" PRIMARY KEY ("id")
);
