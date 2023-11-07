module.exports = (sequelize, DataTypes) => {
  const environmentalAlerts = sequelize.define("environmentalAlerts", {
    alertId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    alertType: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        notEmpty: false,
      },
    },
    threshold: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validator: {
        notEmpty: false,
      },
    },
  });
  environmentalAlerts.associate = (models) => {
    environmentalAlerts.belongsTo(models.user);
  };
  return environmentalAlerts;
};
