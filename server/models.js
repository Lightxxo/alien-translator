const { Sequelize, DataTypes } = require("@sequelize/core");
const config = require('./config');

const sequelize = new Sequelize(config);
  
const Link = sequelize.define(
    "Link",
    {
      link: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      data: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  );
  
  
const Words = sequelize.define(
    "Words",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      earthWord: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alienWord: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  );


  module.exports = { Link, Words, sequelize };