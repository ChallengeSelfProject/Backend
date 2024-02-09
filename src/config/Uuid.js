const uuid = require('uuid')
const Uuid = {
  generate: () => {
    return uuid.v4()
  }
}
module.exports = Uuid
