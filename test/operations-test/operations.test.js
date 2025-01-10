import supertest from "supertest";
import { web } from "../../src/app/web";
import {
  createTestDevice,
  removeTestDevice,
} from "../device-test/device-test-utils";
import {
  createTestFish,
  removeTestFishes,
} from "../fishtypes-test/fish-test-utils";
import {
  createTestOperation,
  removeTestOperations,
} from "./operations-test-utils";

describe("GET /api/operations", () => {
  it("should can get all operations data", async () => {
    const result = await supertest(web).get("/api/operations");

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Successfully get all operations data");
    expect(typeof result.body.dataLength).toBe("number");
    expect(result.body.data).toBeInstanceOf(Array);
  });

  it("should not get all data when endpoint is not correct", async () => {
    const result = await supertest(web).get("/api/operationz");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/operations/processing", () => {
  let testOperation;

  beforeEach(async () => {
    testOperation = await createTestOperation();
  });

  afterEach(async () => {
    await removeTestOperations(testOperation.id);
  });

  it("should can get latest processing operations", async () => {
    const result = await supertest(web).get(`/api/operations/processing`);

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body.message).toBe("Successfully get processing data");
    expect(typeof result.body.process_id).toBe("string");
    expect(typeof result.body.clean_speed).toBe("number");
    expect(typeof result.body.clean_duration).toBe("number");
  });
});

describe("GET /api/operations/:operationId", () => {
  let testOperation;

  beforeEach(async () => {
    testOperation = await createTestOperation();
  });

  afterEach(async () => {
    await removeTestOperations(testOperation.id);
  });

  it("should can get operation details data", async () => {
    const result = await supertest(web).get(
      `/api/operations/${testOperation.id}`
    );

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Successfully get operation details");
    expect(result.body.data).toBeInstanceOf(Object);
  });

  it("should can not get operation details when operationId is not correct", async () => {
    const result = await supertest(web).get(
      `/api/operations/${testOperation.id + "wrongid"}`
    );

    expect(result.status).toBe(404);
    expect(result.body.message).toBe("There is no result data found");
  });
});

describe("GET /api/operations/force-stop/:operationId", () => {
  let testOperation;

  beforeEach(async () => {
    testOperation = await createTestOperation();
  });

  afterEach(async () => {
    await removeTestOperations(testOperation.id);
  });

  it("should can force stop clean operation", async () => {
    const result = await supertest(web).get(
      `/api/operations/force-stop/${testOperation.id}`
    );

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Clean operation successfully stopped");
    expect(new Date(result.body.data.end_time)).not.toBe("Invalid Date");
    expect(result.body.data.status).toBe("Force Stopped");
  });
});

describe("GET /api/operations/finish/:processId", () => {
  let testOperation;

  beforeEach(async () => {
    testOperation = await createTestOperation();
  });

  afterEach(async () => {
    await removeTestOperations(testOperation.id);
  });

  it("should can update the process data to finished", async () => {
    const result = await supertest(web).get(
      `/api/operations/finish/${testOperation.CleaningOperation.id}`
    );

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Successfully update process to finished");
    expect(new Date(result.body.data.end_time)).not.toBe("Invalid Date");
    expect(result.body.data.status).toBe("Finished");
  });
});

describe("POST /api/operations/:deviceId/:fishId", () => {
  let testDevice, testFish;

  beforeEach(async () => {
    testDevice = await createTestDevice();
    testFish = await createTestFish();
  });

  afterEach(async () => {
    await removeTestDevice();
    await removeTestFishes();
  });

  it("should create a new operation", async () => {
    const payload = {
      start_time: "2024-11-29T12:34:56Z",
      framework: "test",
      connection_type: "Cellular",
      cellular_generation: "4G",
    };

    const result = await supertest(web)
      .post(`/api/operations/${testDevice.id}/${testFish.id}`)
      .send(payload);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Successfully created new operation");
    expect(result.body.data).toBeInstanceOf(Object);

    await removeTestOperations(result.body.data.id);
  });

  it("should create a new operation even not sending cellular_generation data", async () => {
    const payload = {
      start_time: "2024-11-29T12:34:56Z",
      framework: "test",
      connection_type: "Wi-Fi",
    };

    const result = await supertest(web)
      .post(`/api/operations/${testDevice.id}/${testFish.id}`)
      .send(payload);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Successfully created new operation");
    expect(result.body.data).toBeInstanceOf(Object);

    await removeTestOperations(result.body.data.id);
  });
});

describe("DELETE /api/operations/remove/:operationId", () => {
  let testOperation;

  beforeEach(async () => {
    testOperation = await createTestOperation();
  });

  it("should can remove operation data", async () => {
    const result = await supertest(web).delete(
      `/api/operations/remove/${testOperation.id}`
    );

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Operation Log Data Successfully Removed");
  });
});
