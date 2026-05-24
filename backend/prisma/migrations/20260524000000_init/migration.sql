-- CreateTable
CREATE TABLE "WorkType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "WorkType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalEntry" (
    "id" TEXT NOT NULL,
    "performedAt" DATE NOT NULL,
    "workTypeId" TEXT NOT NULL,
    "volume" DECIMAL(12,3) NOT NULL,
    "unit" TEXT NOT NULL,
    "workerName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JournalEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkType_name_key" ON "WorkType"("name");

-- CreateIndex
CREATE INDEX "JournalEntry_performedAt_idx" ON "JournalEntry"("performedAt");

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_workTypeId_fkey" FOREIGN KEY ("workTypeId") REFERENCES "WorkType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Seed work types
INSERT INTO "WorkType" ("id", "name", "unit") VALUES
  ('wt_kladka', 'Кладка перегородок', 'м²'),
  ('wt_opalubka', 'Монтаж опалубки', 'м²'),
  ('wt_beton', 'Бетонирование', 'м³'),
  ('wt_armatura', 'Армирование', 'т'),
  ('wt_krovlya', 'Монтаж кровли', 'м²'),
  ('wt_electro', 'Электромонтаж', 'м'),
  ('wt_santeh', 'Сантехнические работы', 'шт'),
  ('wt_otdelka', 'Штукатурные работы', 'м²');
