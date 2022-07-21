const sequelize = require("sequelize");

const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
  }, {
    tableName: 'users',
    underscored: true,
  });

  User.associate = (db) => {
    User.hasMany(db.Pet, { as: 'pets', foreignKey: 'userId' });
  }

  return User;
};

module.exports = createUser;

