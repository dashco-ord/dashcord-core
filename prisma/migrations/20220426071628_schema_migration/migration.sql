-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "rollNo" TEXT,
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
INSERT INTO "new_Student" ("address", "admissionDate", "age", "cast", "createdAt", "dateOfBirth", "department", "email", "gender", "hod_id", "id", "name", "phoneNo", "pictureUrl", "religion", "rollNo", "seatType", "tg_id", "updatedAt") SELECT "address", "admissionDate", "age", "cast", "createdAt", "dateOfBirth", "department", "email", "gender", "hod_id", "id", "name", "phoneNo", "pictureUrl", "religion", "rollNo", "seatType", "tg_id", "updatedAt" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
