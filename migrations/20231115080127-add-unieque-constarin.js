"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addConstraint("environmentalalerts", {
      fields: ["alertType", "threshold", "userUserId"],
      type: "unique",
      name: "unique environmentalalerts",
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeConstraint(
      "environmentalalerts",
      "unique environmentalalerts"
    );
  },
};
