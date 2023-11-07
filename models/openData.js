module.exports = (sequelize, DataTypes) => {
  const openData = sequelize.define("openData", {
    accessId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    organization: {
      type: DataTypes.STRING,
    },

    key: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        notEmpty: false,
      },
    },
    permession: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        notEmpty: false,
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        notEmpty: false,
      },
    },
  });
  return openData;
};
