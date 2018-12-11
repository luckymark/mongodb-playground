import { expect } from "chai"
import { db } from "../mongo"

const col = db.get("test")

describe("create a doc or a embedded object", () => {
  after(() => db.close())

  afterEach(async () => {
    await col.remove()
  })

  it("create a simple doc", async () => {
    await col.insert({
      _id: 1,
      name: "Mark"
    })

    let person = await col.findOne({ _id: 1 })
    expect(person.name).to.equal("Mark")
  })

  it("create a object in a embedded array", async () => {
    await col.insert({ _id: 1, name: "Mark", friends: [] })

    await col.update({ _id: 1 }, { $push: { friends: "luckystar" } })
    await col.update({ _id: 1 }, { $push: { friends: "andy" } })

    let person = await col.findOne({ _id: 1 })
    expect(person.friends[0]).to.equal("luckystar")
    expect(person.friends[1]).to.equal("andy")
  })
})
