import { expect } from "chai"
import { db } from "../mongo"

const col = db.get("test")

describe("inc a field", () => {
  after(() => db.close())

  afterEach(async () => {
    await col.remove()
  })

  it("inc +5", async () => {
    await col.insert({ name: "Mark", age: 25 })

    await col.update({ name: "Mark" }, { $inc: { age: 5 } })
    let person = await col.findOne({ name: "Mark" })
    expect(person.age).to.equal(30)
  })

  it("inc -5", async () => {
    await col.insert({ name: "Mark", age: 25 })

    await col.update({ name: "Mark" }, { $inc: { age: -5 } })
    let person = await col.findOne({ name: "Mark" })
    expect(person.age).to.equal(20)
  })
})
