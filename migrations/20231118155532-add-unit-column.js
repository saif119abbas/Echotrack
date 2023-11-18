// migrations/xxxxxx-add-new-column.js

"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("environmentaldata", "unit", {
      type: Sequelize.STRING,
      allowNull: false,
      validator: {
        notEmpty: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("environmentaldata", "unit");
  },
};
