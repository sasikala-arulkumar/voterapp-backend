// const request = require("supertest");
// const mongoose = require("mongoose");
// const app = require("../app"); // import your Express app
// const Voter = require("../models/Voter");

// // Use a separate test database
// const MONGO_TEST_URI = "mongodb://127.0.0.1:27017/voterapp_test";

// beforeAll(async () => {
//   await mongoose.connect(MONGO_TEST_URI); // removed deprecated options
// });

// afterAll(async () => {
//   await mongoose.connection.dropDatabase(); // clean up after tests
//   await mongoose.connection.close();
// });

// describe("Voter API", () => {
//   let voterId;

//   // CREATE
//   it("should create a new voter", async () => {
//     const res = await request(app)
//       .post("/api/voters")
//       .send({
//         voterName: "John Doe",
//         age: 30,
//         gender: "Male",
//         aadhaarNumber: "123456789012",
//         phoneNumber: "9876543210",
//       });

//     expect(res.statusCode).toBe(201);
//     expect(res.body.voterName).toBe("John Doe");
//     voterId = res.body._id; // save for later tests
//   });

//   // READ ALL
//   it("should get all voters", async () => {
//     const res = await request(app).get("/api/voters");
//     expect(res.statusCode).toBe(200);
//     expect(res.body.length).toBeGreaterThan(0);
//   });

//   // READ ONE
//   it("should get a voter by id", async () => {
//     const res = await request(app).get(`/api/voters/${voterId}`);
//     expect(res.statusCode).toBe(200);
//     expect(res.body._id).toBe(voterId); // access top-level _id
//   });

//   // UPDATE
//   it("should update a voter", async () => {
//     const res = await request(app)
//       .put(`/api/voters/${voterId}`)
//       .send({ age: 35 });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.voter.age).toBe(35); // match your app response structure
//   });

//   // DELETE
//   it("should delete a voter", async () => {
//     const res = await request(app).delete(`/api/voters/${voterId}`);
//     expect(res.statusCode).toBe(200);
//     expect(res.body.voter._id).toBe(voterId); // access _id inside voter object
//   });
// });
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app"); // import your Express app
const Voter = require("../models/Voter");

// Use a separate test database
const MONGO_TEST_URI = "mongodb://127.0.0.1:27017/voterapp_test";

beforeAll(async () => {
  await mongoose.connect(MONGO_TEST_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Voter API", () => {
  let voterId;

  // CREATE
  it("should create a new voter", async () => {
    const res = await request(app)
      .post("/api/voters")
      .send({
        voterName: "John Doe",
        age: 30,
        gender: "Male",
        aadhaarNumber: "123456789012",
        phoneNumber: "9876543210",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.voterName).toBe("John Doe");
    voterId = res.body._id;
  });

  // READ ALL
  it("should get all voters", async () => {
    const res = await request(app).get("/api/voters");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // READ ONE
  it("should get a voter by id", async () => {
    const res = await request(app).get(`/api/voters/${voterId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(voterId);
  });

  // UPDATE
  it("should update a voter", async () => {
    const res = await request(app)
      .put(`/api/voters/${voterId}`)
      .send({ age: 35 });

    expect(res.statusCode).toBe(200);
    expect(res.body.voter.age).toBe(35);
  });

  // DELETE
  it("should delete a voter", async () => {
    const res = await request(app).delete(`/api/voters/${voterId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.voter._id).toBe(voterId);
  });
});
