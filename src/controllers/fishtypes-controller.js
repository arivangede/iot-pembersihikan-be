import fishtypesService from "../services/fishtypes-service.js";

const getAllFishTypes = async (req, res, next) => {
  try {
    const { search } = req.query;
    const result = await fishtypesService.getAllFishTypes(search);

    const dataLength = result.length;

    res.status(200).json({
      message: "Successfully get fishtypes data",
      dataLength: dataLength,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getFishTypeDataById = async (req, res, next) => {
  try {
    const { fishId } = req.params;
    const result = await fishtypesService.getFishTypeDataById(fishId);
    res.status(200).json({
      message: "Successfully Get Fish Type Data.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const result = await fishtypesService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { fishId } = req.params;
    const result = await fishtypesService.update(fishId, req.body);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { fishId } = req.params;
    const result = await fishtypesService.remove(fishId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllFishTypes,
  getFishTypeDataById,
  register,
  update,
  remove,
};
