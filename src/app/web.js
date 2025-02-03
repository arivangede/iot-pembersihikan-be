import express from "express";
import cors from "cors";
import { devicesRouter } from "../routes/devices-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { fishTypesRouter } from "../routes/fish-types-api.js";
import { operationsRouter } from "../routes/operation-api.js";

export const web = express();
web.use(cors());
web.use(express.json());

web.use(devicesRouter);
web.use(fishTypesRouter);
web.use(operationsRouter);
web.use(errorMiddleware);
