-- CreateTable
CREATE TABLE "Hod" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "address" TEXT,
    "portfolio" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL,
    "bio" TEXT,
    "department" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TgIncharge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Tg" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "bio" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Parents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "studentId" TEXT,
    CONSTRAINT "Parents_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "rollNo" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "cast" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "seatType" TEXT NOT NULL,
    "admissionDate" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "hod_id" TEXT,
    "tg_id" TEXT,
    CONSTRAINT "Student_hod_id_fkey" FOREIGN KEY ("hod_id") REFERENCES "Hod" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Student_tg_id_fkey" FOREIGN KEY ("tg_id") REFERENCES "Tg" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Hod_email_key" ON "Hod"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TgIncharge_email_key" ON "TgIncharge"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tg_email_key" ON "Tg"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
