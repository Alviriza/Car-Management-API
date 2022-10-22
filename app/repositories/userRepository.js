const { User } = require('../models');
const { Usertype } = require('../models');

module.exports = {
  create(body) {
    return User.create({
      email: body.email,
      password: body.password,
      idtype: body.idtype,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  },
  
  createType(body) {
    return Usertype.create(body)
  },

  getAllUser() {
    return User.findAll()
  },

  getUserById(id) {
    return User.findByPk(id)
  },

  getUserByEmail(email) {
    return User.findOne(email)
  },

  update(body, id) {
    return User.update(body, { where: { id } })
  },

  delete(id) {
    return User.destroy(id)
  }
}
