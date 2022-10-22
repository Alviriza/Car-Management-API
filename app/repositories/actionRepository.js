const { Action } = require("../models");

module.exports = {
  create(body) {
    return Action.create(body);
  },
  
  update(body, id) {
    return Action.update(body, { where: { id } });
  }
};