import supertest from "supertest";
import { web } from "../../src/app/web.js";
import { prisma } from "../../src/utils/database.js";
import {
  countTestDevice,
  createTestDevice,
  removeTestDevice,
} from "./device-test-utils.js";

describe("GET /api/devices", () => {
  it("should can get all devices data", async () => {
    const result = await supertest(web).get("/api/devices");

    expect(result.status).toBe(200);
    expect(result.body.data).toBeInstanceOf(Array);
  });
});

describe("GET /api/devices/by-id/:deviceId", () => {
  afterEach(async () => {
    await removeTestDevice();
  });

  it("should can get device data by id", async () => {
    const device = await createTestDevice();
    const result = await supertest(web).get(`/api/devices/by-id/${device.id}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Successfully Get Device Data");
    expect(result.body.data.brand).toBe("Test Brand");
    expect(result.body.data.model).toBe("Test Model");
    expect(result.body.data.os).toBe("Test OS");
    expect(result.body.data.os_version).toBe("Test OS Version");
    expect(result.body.data.processor).toBe("Test Processor");
    expect(result.body.data.ram).toBe(20);
  });

  it("should not can get device data if device id is not correct", async () => {
    const device = await createTestDevice();
    const result = await supertest(web).get(
      `/api/devices/by-id/AAA${device.id}`
    );

    expect(result.status).toBe(404);
    expect(result.body.message).toBe("Device Data Is Not Found");
  });
});

describe("POST /api/devices/register", function () {
  afterEach(async () => {
    await removeTestDevice();
  });

  it("should can register new device", async () => {
    const result = await supertest(web).post("/api/devices/register").send({
      brand: "Test Brand",
      model: "Test Model",
      os: "Test OS",
      os_version: "Test OS Version",
      processor: "Test Processor",
      ram: 20,
    });

    expect(result.status).toBe(201);
    expect(result.body.message).toBe("Device Registered Successfuly");
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.brand).toBe("Test Brand");
    expect(result.body.data.model).toBe("Test Model");
    expect(result.body.data.os).toBe("Test OS");
    expect(result.body.data.os_version).toBe("Test OS Version");
    expect(result.body.data.processor).toBe("Test Processor");
    expect(result.body.data.ram).toBe(20);
  });

  it("should not can register new device if data is not valid", async () => {
    const result = await supertest(web).post("/api/devices/register").send({
      brand: "Test Brand",
      model: "Test Model",
      os: "Test OS",
      os_version: "Test OS Version",
      processor: "Test Processor",
      ram: "20gb", // invalid data type
    });

    expect(result.status).toBe(400);
  });

  it("should not can register if same device is already exists", async () => {
    await prisma.device.create({
      data: {
        brand: "Test Brand",
        model: "Test Model",
        os: "Test OS",
        os_version: "Test OS Version",
        processor: "Test Processor",
        ram: 20,
      },
    });
    const result = await supertest(web).post("/api/devices/register").send({
      brand: "Test Brand",
      model: "Test Model",
      os: "Test OS",
      os_version: "Test OS Version",
      processor: "Test Processor",
      ram: 20,
    });

    expect(result.status).toBe(201);
    expect(result.body.message).toBe(
      "This Device Data Is Already Exists, Register New Device Aborted"
    );
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.brand).toBe("Test Brand");
    expect(result.body.data.model).toBe("Test Model");
    expect(result.body.data.os).toBe("Test OS");
    expect(result.body.data.os_version).toBe("Test OS Version");
    expect(result.body.data.processor).toBe("Test Processor");
    expect(result.body.data.ram).toBe(20);
  });
});

describe("PATCH /api/devices/update/:deviceId", () => {
  afterEach(async () => {
    await removeTestDevice();
  });

  it("should can update device data", async () => {
    const device = await createTestDevice();
    const result = await supertest(web)
      .patch(`/api/devices/update/${device.id}`)
      .send({
        model: "Test Update Model", //update data can be single key or whole key
      });

    expect(result.status).toBe(200);
    expect(result.body.data.brand).toBe(device.brand);
    expect(result.body.data.model).toBe("Test Update Model");
    expect(result.body.data.os).toBe(device.os);
    expect(result.body.data.os_version).toBe(device.os_version);
    expect(result.body.data.processor).toBe(device.processor);
    expect(result.body.data.ram).toBe(device.ram);
  });

  it("should not update device data if data type is invalid", async () => {
    const device = await createTestDevice();
    const result = await supertest(web)
      .patch(`/api/devices/update/${device.id}`)
      .send({
        model: 234, //wrong data type , must string but sending number
      });

    expect(result.status).toBe(400);
  });

  it("should not update device data if id is not found", async () => {
    const device = await createTestDevice();
    const result = await supertest(web)
      .patch(`/api/devices/update/${device.id}AAA`)
      .send({
        model: "Test Update Model",
      });

    expect(result.status).toBe(404);
    expect(result.body.message).toBe("Device Data Is Not Found");
  });
});

describe("DELETE /api/devices/remove/:deviceId", () => {
  afterEach(async () => {
    await removeTestDevice();
  });

  it("should can delete device data", async () => {
    const device = await createTestDevice();
    const result = await supertest(web).delete(
      `/api/devices/remove/${device.id}`
    );

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Device Data Removed Successfully");

    const deviceCount = await countTestDevice();

    expect(deviceCount).toBe(0);
  });

  it("should not delete device data if id device is not found", async () => {
    const device = await createTestDevice();
    const result = await supertest(web).delete(
      `/api/devices/remove/${device.id}AAA`
    );

    expect(result.status).toBe(404);
    expect(result.body.message).toBe("Device Data Is Not Found");

    const deviceCount = await countTestDevice();

    expect(deviceCount).toBe(1);
  });
});
