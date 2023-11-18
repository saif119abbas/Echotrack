module.exports = (sequelize, DataTypes) => {
  const environmentalAlerts = sequelize.define(
    "environmentalAlerts",
    {
      alertId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      alertType: {
        type: DataTypes.STRING,
        validator: {
          notEmpty: false,
        },
      },
      threshold: {
        type: DataTypes.FLOAT,
        validator: {
          notEmpty: false,
        },
      },
  
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["alertType", "threshold", "userUserId"],
        },
      ],
    }
  );
  environmentalAlerts.associate = (models) => {
    environmentalAlerts.belongsTo(models.user);
  };
  return environmentalAlerts;
};
