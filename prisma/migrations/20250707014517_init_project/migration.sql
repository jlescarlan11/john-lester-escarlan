-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(55) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "technology" TEXT[],
    "link" TEXT NOT NULL,
    "isfeatured" BOOLEAN NOT NULL DEFAULT false,
    "preview" TEXT,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);
