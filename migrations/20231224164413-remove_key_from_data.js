// migrations/xxxxxx-add-new-column.js

"use strict";

module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.removeColumn("environmentaldata", "key");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("environmentaldata", "key", {
      type: Sequelize.STRING,
      allowNull: false,
      validator: {
        notEmpty: false,
      },
    });
  },
};
{
  score: "##";
}
