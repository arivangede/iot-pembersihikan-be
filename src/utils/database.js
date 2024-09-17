import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/logging.js";

export const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "warn",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "error",
    },
  ],
});

prisma.$on("error", (e) => {
  logger.error(e);
});
prisma.$on("query", (e) => {
  logger.info(e);
});
prisma.$on("info", (e) => {
  logger.info(e);
});
prisma.$on("warn", (e) => {
  logger.warn(e);
});
