import supertest from "supertest";
import { web } from "../../src/app/web";
import { createTestFish, removeTestFishes } from "./fish-test-utils";

describe("GET /api/fish-types", () => {
  it("should get all fish types data", async () => {
    const result = await supertest(web).get("/api/fish-types");

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Successfully get fishtypes data");
    expect(typeof result.body.dataLength).toBe("number");
    expect(result.body.data).toBeInstanceOf(Array);
  });

  it("should 404 when endpoint is not correct", async () => {
    const result = await supertest(web).get("/api/fist-typez");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/fish-types/:fishId", () => {
  afterEach(async () => {
    await removeTestFishes();
  });

  it("should get fish data by id", async () => {
    const testFish = await createTestFish();
    const result = await supertest(web).get(`/api/fish-types/${testFish.id}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Successfully Get Fish Type Data.");
    expect(result.body.data).toBeInstanceOf(Object);
  });

  it("should not get fish data when id is not found", async () => {
    const testFish = await createTestFish();
    const result = await supertest(web).get(
      `/api/fish-types/${testFish.id + 1}`
    );

    expect(result.status).toBe(404);
    expect(result.body.message).toBe("There's no record of this Fish ID");
  });
});

describe("POST /api/fish-types/register", () => {
  afterEach(async () => {
    await removeTestFishes();
  });
  it("should can register new fish", async () => {
    const result = await supertest(web).post("/api/fish-types/register").send({
      name: "test fish",
      cleaning_speed: 2000,
      cleaning_duration: 60000,
    });

    expect(result.status).toBe(201);
    expect(result.body.message).toBe("Fish Type Registered Successfully");
    expect(result.body.data).toBeInstanceOf(Object);
  });

  it("should not register new fish type with same name", async () => {
    await createTestFish();
    const result = await supertest(web).post("/api/fish-types/register").send({
      name: "test fish",
      cleaning_speed: 2500,
      cleaning_duration: 65000,
    });

    expect(result.status).toBe(400);
    expect(result.body.message).toBe("This Fish is already registered");
  });
});

describe("PATCH /api/fish-types/update/:fishId", () => {
  afterEach(async () => {
    await removeTestFishes();
  });

  it("should can update fish type data", async () => {
    const testFish = await createTestFish();
    const result = await supertest(web)
      .patch(`/api/fish-types/update/${testFish.id}`)
      .send({
        name: "test fish",
        cleaning_speed: 2500,
        cleaning_duration: 65999,
      });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Fish Type Data Updated Successfully");
    expect(result.body.data).toBeInstanceOf(Object);
    expect(result.body.data.name).toBe("test fish");
    expect(result.body.data.cleaning_speed).toBe(2500);
    expect(result.body.data.cleaning_duration).toBe(65999);
  });
});

describe("DELETE /api/fish-type/delete/:fishId", () => {
  it("should can delete fish type data", async () => {
    const testFish = await createTestFish();
    const result = await supertest(web).delete(
      `/api/fish-types/delete/${testFish.id}`
    );

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Fish Type Successfully Deleted.");
  });
});
