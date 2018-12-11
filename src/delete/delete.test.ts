import { expect } from "chai"
import { db } from "../mongo"

const col = db.get("test")

describe("delete a doc or e embedded object", () => {
  after(() => db.close())

  afterEach(async () => {
    await col.remove()
  })

  it("delete a doc", async () => {
    await col.insert({
      _id: 1,
      name: "Mark"
    })

    await col.remove({ _id: 1 })
    let person = await col.findOne({ _id: 1 })
    expect(person).to.be.null
  })

  it("delete a object in a embedded array", async () => {
    await col.insert({ _id: 1, name: "Mark", friends: ["luckystar", "andy"] })

    await col.update({ _id: 1 }, { $pull: { friends: "andy" } })
    let person = await col.findOne({ _id: 1 })
    expect(person.friends.length).to.be.equal(1)
    expect(person.friends[0]).to.be.equal("luckystar")
  })
})
