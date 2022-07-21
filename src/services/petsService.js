// petsService
const db = require('../database/models');

const petsService = {
  create: async ({ name, userId }) => {
    const pet = await db.Pet.create({ name, userId });
    return pet;
  },

  list: async () => {
    const pets = await db.Pet.findAll();
    return pets;
  },

  findById: async (id) => {
    const pet = await db.Pet.findByPk(id, {
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
      include: { 
        model: db.User, 
        as: 'user', 
        attributes: { exclude: ['passwordHash', 'createdAt', 'updatedAt'] }, 
      },
    });

    return pet;
  },
};

module.exports = petsService;