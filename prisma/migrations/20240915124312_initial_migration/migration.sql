-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "device_name" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "processor" TEXT NOT NULL,
    "ram" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FishType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cleaning_speed" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FishType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CleaningOperation" (
    "id" TEXT NOT NULL,
    "fk_fish_id" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CleaningOperation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerformanceLog" (
    "id" TEXT NOT NULL,
    "framework" TEXT NOT NULL,
    "request_time" DOUBLE PRECISION NOT NULL,
    "fk_device_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PerformanceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "fk_performancelog_id" TEXT NOT NULL,
    "fk_cleaningoperation_id" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Result_fk_performancelog_id_key" ON "Result"("fk_performancelog_id");

-- CreateIndex
CREATE UNIQUE INDEX "Result_fk_cleaningoperation_id_key" ON "Result"("fk_cleaningoperation_id");

-- AddForeignKey
ALTER TABLE "CleaningOperation" ADD CONSTRAINT "CleaningOperation_fk_fish_id_fkey" FOREIGN KEY ("fk_fish_id") REFERENCES "FishType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceLog" ADD CONSTRAINT "PerformanceLog_fk_device_id_fkey" FOREIGN KEY ("fk_device_id") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_fk_performancelog_id_fkey" FOREIGN KEY ("fk_performancelog_id") REFERENCES "PerformanceLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_fk_cleaningoperation_id_fkey" FOREIGN KEY ("fk_cleaningoperation_id") REFERENCES "CleaningOperation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
