import express from "express";
import fishtypesController from "../controllers/fishtypes-controller.js";

export const fishTypesRouter = new express.Router();
fishTypesRouter.get("/api/fish-types", fishtypesController.getAllFishTypes);
fishTypesRouter.get(
  "/api/fish-types/:fishId",
  fishtypesController.getFishTypeDataById
);
fishTypesRouter.post("/api/fish-types/register", fishtypesController.register);
fishTypesRouter.patch(
  "/api/fish-types/update/:fishId",
  fishtypesController.update
);
fishTypesRouter.delete(
  "/api/fish-types/delete/:fishId",
  fishtypesController.remove
);
