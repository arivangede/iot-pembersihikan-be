import { prisma } from "../utils/database.js";
import {
  registerDeviceValidation,
  updateDeviceValidation,
} from "../validations/device-validation.js";
import { validate } from "../validations/validation.js";
import { ResponseError } from "../error/response-error.js";

const getAllDevices = async () => {
  const devices = await prisma.device.findMany();

  return devices;
};

const getDevicesById = async (deviceId) => {
  const device = await prisma.device.findFirst({
    where: {
      id: deviceId,
    },
  });

  if (!device) {
    throw new ResponseError(404, "Device Data Is Not Found");
  }

  return device;
};

const register = async (request) => {
  const newDevice = validate(registerDeviceValidation, request);

  const device = await prisma.device.findFirst({
    where: {
      AND: [
        { brand: newDevice.brand },
        { model: newDevice.model },
        { os: newDevice.os },
        { os_version: newDevice.os_version },
        { ram: newDevice.ram },
      ],
    },
  });

  if (device) {
    return {
      message:
        "This Device Data Is Already Exists, Register New Device Aborted",
      data: device,
    };
  }

  const data = await prisma.device.create({
    data: newDevice,
  });

  return { message: "Device Registered Successfuly", data: data };
};

const update = async (deviceId, request) => {
  const requestBody = await validate(updateDeviceValidation, request);

  const device = await getDevicesById(deviceId);

  let updateData = {};

  if (requestBody.brand) {
    updateData.brand = requestBody.brand;
  }
  if (requestBody.model) {
    updateData.model = requestBody.model;
  }
  if (requestBody.os) {
    updateData.os = requestBody.os;
  }
  if (requestBody.os_version) {
    updateData.os_version = requestBody.os_version;
  }
  if (requestBody.ram) {
    updateData.ram = requestBody.ram;
  }

  const result = await prisma.device.update({
    where: {
      id: device.id,
    },
    data: updateData,
  });

  return { message: "Device Data Updated Successfuly", data: result };
};

const remove = async (deviceId) => {
  const device = await getDevicesById(deviceId);

  await prisma.device.delete({
    where: {
      id: device.id,
    },
  });

  return { message: "Device Data Removed Successfully" };
};

export default { getAllDevices, getDevicesById, register, update, remove };
