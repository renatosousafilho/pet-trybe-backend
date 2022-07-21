const createModelPet = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    name: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
    }
  }, {
    tableName: 'pets',
    underscored: true,
  });

  Pet.associate = (db) => {
    // Pet.belongsTo(db.User, { as: 'user', foreignKey: 'userId' })
  }

  return Pet;
}

module.exports = createModelPet;