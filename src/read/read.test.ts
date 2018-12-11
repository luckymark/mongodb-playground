import { expect } from "chai"
import { db } from "../mongo"

const col = db.get("test")

describe("read", () => {
  after(() => db.close())

  afterEach(async () => {
    await col.remove()
  })

  it("query a object in a embedded object ", async () => {
    await col.insert({
      _id: 1,
      name: "Mark",
      friends: [{ _id: 1, name: "luckystar" }, { _id: 2, name: "andy" }]
    })

    let person = await col.findOne(
      { _id: 1 },
      { friends: { $elemMatch: { _id: 2 } } }
    )
    expect(person).to.deep.equal({
      _id: 1,
      friends: [{ _id: 2, name: "andy" }]
    })
  })
})
