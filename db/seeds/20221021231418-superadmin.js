'use strict';
const bcrypt = require("bcrypt");

module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("Alvi123", 10);
    await queryInterface.bulkInsert("Users", [
      {
        email: "alviriza@gmail.com",
        password: hashedPassword,
        idtype: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
