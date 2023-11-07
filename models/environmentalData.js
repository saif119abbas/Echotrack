module.exports = (sequelize, DataTypes) => {
  const environmentalData = sequelize.define("environmentalData", {
    dataId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dataType: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        notEmpty: false,
      },
    },

    key: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        notEmpty: false,
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        notEmpty: false,
      },
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validator: {
        notEmpty: false,
      },
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        notEmpty: false,
      },
    },
  });
  environmentalData.associate = (models) => {
    environmentalData.belongsTo(models.user);
  };
  return environmentalData;
};
