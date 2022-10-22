const userRepository = require('../repositories/userRepository')

module.exports = {
    create(body) {
        return userRepository.create(body)
      },
  
    createType(body) {
        return userRepository.createType(body)
    },

    getAllUser() {
        return userRepository.getAllUser()
    },

    getUserById(id) {
        return userRepository.getUserById(id)
    },

    getUserByEmail(email) {
        return userRepository.getUserByEmail(email)
    },

    update(body, id) {
        return userRepository.update(body, id)
    },

    delete(id) {
        return userRepository.delete(id)
    }  
}
