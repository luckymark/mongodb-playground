import { expect } from "chai"
import { db } from "../mongo"

const col = db.get("test")

describe("update a simple doc", () => {
  after(() => db.close())

  afterEach(async () => {
    await col.remove()
  })

  it("update a doc", async () => {
    await col.insert({
      _id: 1,
      name: "Mark"
    })

    await col.update({ _id: 1 }, { $set: { name: "luckymark" } })
    let person = await col.findOne({ _id: 1 })
    expect(person.name).to.equal("luckymark")
  })

  it("update a object in a embedded array", async () => {
    await col.insert({
      _id: 1,
      name: "Mark",
      friends: [{ _id: 1, name: "luckystar" }, { _id: 2, name: "andy" }]
    })

    await col.update(
      { _id: 1, "friends._id": 2 },
      { $set: { "friends.$.name": "luckymark" } }
    )
    let person = await col.findOne({ _id: 1 })
    expect(person).to.deep.equal({
      _id: 1,
      name: "Mark",
      friends: [
        {
          _id: 1,
          name: "luckystar"
        },
        { _id: 2, name: "luckymark" }
      ]
    })
  })
})
