const { Cars } = require("../models");
const { Action } = require("../models");

module.exports = {
  getAll() {
    return Cars.findAll({
        include: [{ model: Action }],
    });
  },

  create(body) {
    return Cars.create(body);
  },

  update(body, id) {
    return Cars.update(body, { where: { id } });
  },

  delete(id) {
    return Cars.destroy({ where: { id } });
  },

  getById(id) {
    return Cars.findByPk(id, {
        include: [{ model: Action }],
    });
  },

  getTotalCar() {
    return Cars.count();
  },
  
  getAllDeleted(showDeleted = true) {
    return Cars.findAll({
        include: [{ model: Action }],
        paranoid: !showDeleted,
    });
  }
};