import { ResponseError } from "../error/response-error.js";
import { prisma } from "../utils/database.js";
import {
  registerFishTypeValidation,
  updateFishTypeValidation,
} from "../validations/fishtype-validation.js";
import { validate } from "../validations/validation.js";

const getAllFishTypes = async (search = null) => {
  const query = {
    orderBy: {
      name: "asc",
    },
  };

  if (search && search !== "") {
    query.where = {
      name: {
        contains: search.toLowerCase(),
      },
    };
  }

  const fishTypes = await prisma.fishType.findMany(query);

  return fishTypes;
};

const getFishTypeDataById = async (fishId) => {
  const fish = await prisma.fishType.findFirst({
    where: {
      id: fishId,
    },
  });

  if (!fish) {
    throw new ResponseError(404, "There's no record of this Fish ID");
  }

  return fish;
};

const register = async (request) => {
  const newFish = await validate(registerFishTypeValidation, request);

  const fish = await prisma.fishType.findFirst({
    where: {
      name: newFish.name,
    },
  });

  if (fish) {
    throw new ResponseError(400, "This Fish is already registered");
  }

  const data = await prisma.fishType.create({
    data: newFish,
  });

  return { message: "Fish Type Registered Successfully", data: data };
};

const update = async (fishId, request) => {
  const fish = await getFishTypeDataById(fishId);
  const data = await validate(updateFishTypeValidation, request);

  let updateData = {};

  if (data.name) {
    updateData.name = data.name;
  }
  if (data.cleaning_speed) {
    updateData.cleaning_speed = data.cleaning_speed;
  }
  if (data.cleaning_duration) {
    updateData.cleaning_duration = data.cleaning_duration;
  }

  const result = await prisma.fishType.update({
    where: {
      id: fish.id,
    },
    data: updateData,
  });

  return { message: "Fish Type Data Updated Successfully", data: result };
};

const remove = async (fishId) => {
  const fish = await getFishTypeDataById(fishId);

  await prisma.fishType.delete({
    where: {
      id: fish.id,
    },
  });

  return { message: "Fish Type Successfully Deleted." };
};

export default {
  getAllFishTypes,
  getFishTypeDataById,
  register,
  update,
  remove,
};
