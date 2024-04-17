import jsonMockData from "./mock/tea-data.json";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  for (const review of jsonMockData) {
    await prisma.review.create({
      data: review,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect().catch((e) => {
      console.log(e);
      process.exit(1);
    });
  });
