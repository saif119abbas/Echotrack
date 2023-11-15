module.exports = (sequelize, DataTypes) => {
  const notifications = sequelize.define("notifications", {
    notifyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    decription: {
      type: DataTypes.STRING,
      validator: {
        notEmpty: false,
      },
    },
  });
  notifications.associate = (models) => {
    notifications.belongsTo(models.user);
  };
  return notifications;
};
