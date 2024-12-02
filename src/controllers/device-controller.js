import deviceService from "../services/device-service.js";

const getAllDevices = async (req, res, next) => {
  try {
    const result = await deviceService.getAllDevices();

    const dataLength = result.length;

    res.status(200).json({
      message: "Successfully Get Devices Data",
      count: dataLength,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getDeviceById = async (req, res, next) => {
  try {
    const { deviceId } = req.params;

    const result = await deviceService.getDevicesById(deviceId);
    res.status(200).json({
      message: "Successfully Get Device Data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const result = await deviceService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { deviceId } = req.params;
    const request = req.body;

    const result = await deviceService.update(deviceId, request);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { deviceId } = req.params;

    const result = await deviceService.remove(deviceId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllDevices,
  getDeviceById,
  register,
  update,
  remove,
};
