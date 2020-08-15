const request = require("supertest")
const auth = require("../api/server")
const db = require("../database/dbConfig")
const User = require("../auth/user-model")

beforeEach(async () => {
  await db("users").truncate()
})

describe("Add a user", () => {
  describe("register()", () => {
    it("should register a new user", async () => {
      await User.add({ username: "aniigar1", password: "password" })
      const user = await db("users")
      expect(user).toHaveLength(1)
    })

    it("should return a user token login()", async () => {
      const res = await request(auth)
        .post("/api/auth/login")
        .send({ username: "aniigar1", password: "password" })
      expect(res.body.token).toBeTruthy()
    })
  })
})
