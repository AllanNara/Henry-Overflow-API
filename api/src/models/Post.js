const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('post', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "uniquePost"
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "uniquePost"
    },
    closed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
    {
      timestamps: true
    });
};