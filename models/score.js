module.exports = (sequelize, DataTypes) => {
  const score = sequelize.define("score", {
    scoreId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    scoreValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validator: {
        notEmpty: false,
      },
    },
  });
  score.associate = (models) => {
    score.belongsTo(models.user);
  };
  return score;
};
