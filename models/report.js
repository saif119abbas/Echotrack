module.exports = (sequelize, DataTypes) => {
  const report = sequelize.define("report", {
    reportId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reportType: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        notEmpty: false,
      },
    },
    description: {
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
  });
  report.associate = (models) => {
    report.belongsTo(models.user);
  };
  return report;
};
