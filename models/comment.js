module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define("comment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        notEmpty: false,
      },
    },
  });
  comment.associate = (models) => {
    comment.belongsTo(models.user);
    comment.belongsTo(models.educational);
  };
  return comment;
};
