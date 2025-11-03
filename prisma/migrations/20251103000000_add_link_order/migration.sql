-- AlterTable
ALTER TABLE "Link" ADD COLUMN "order" INTEGER NOT NULL DEFAULT 0;

-- Create index for better performance
CREATE INDEX "Link_order_idx" ON "Link"("order");
