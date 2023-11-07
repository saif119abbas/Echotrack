module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        notEmpty: false,
      },
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validator: {
        notEmpty: false,
      },
    },
    password: {
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
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        notEmpty: false,
      },
    },
  });
  user.associate = (models) => {
    user.hasOne(models.environmentalData);
    user.hasOne(models.environmentalAlerts);
    user.hasOne(models.report);
    user.hasOne(models.score);
  };
  return user;
};
