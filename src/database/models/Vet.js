const createVetModel = (sequelize, DataTypes) => {
  const Vet = sequelize.define('Vet', {
    name: DataTypes.STRING,
  }, {
    underscored: true,
    tableName: 'vets',
  });

  return Vet;
};

module.exports = createVetModel;