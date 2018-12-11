import monk from "monk"
import * as Trace from "debug-trace-fn"
const trace = Trace("monk")

const db = monk("localhost/playground")

const logger = context => next => (args, method) => {
  return next(args, method).then(res => {
    let {
      col: { collectionName },
      options
    } = args
    trace(`collection: ${collectionName}
    method: ${method}
        options: ${JSON.stringify(options)}
    result: ${JSON.stringify(res)}
    `)
    return res
  })
}

db.addMiddleware(logger)
db.addMiddleware(require("monk-middleware-debug"))

export { db }
