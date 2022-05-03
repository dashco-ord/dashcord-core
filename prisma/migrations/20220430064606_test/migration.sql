-- AlterTable
ALTER TABLE "Hod" ADD COLUMN "passHash" TEXT;

-- AlterTable
ALTER TABLE "Parents" ADD COLUMN "email" TEXT;
ALTER TABLE "Parents" ADD COLUMN "passHash" TEXT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN "passHash" TEXT;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN "passHash" TEXT;

-- AlterTable
ALTER TABLE "Tg" ADD COLUMN "passHash" TEXT;

-- AlterTable
ALTER TABLE "TgIncharge" ADD COLUMN "passHash" TEXT;

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lecture1" TEXT NOT NULL,
    "lecture2" TEXT NOT NULL,
    "lecture3" TEXT NOT NULL,
    "lecture4" TEXT NOT NULL,
    "lecture5" TEXT NOT NULL,
    "lecture6" TEXT NOT NULL,
    "studentId" TEXT,
    CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_studentId_key" ON "Attendance"("studentId");
