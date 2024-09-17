import { web } from "./app/web.js";
import { logger } from "./utils/logging.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;

web.listen(PORT, () => {
  logger.info(`App Started | PORT: ${PORT}`);
});
