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
    interests: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  user.associate = (models) => {
    user.hasMany(models.environmentalData);
    user.hasMany(models.environmentalAlerts);
    user.hasMany(models.report);
    user.hasOne(models.score);
    user.hasMany(models.notifications);
    user.hasMany(models.comment);
  };
  return user;
};
