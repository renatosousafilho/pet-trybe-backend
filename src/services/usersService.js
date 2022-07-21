const Joi = require('joi');
const db = require('../database/models');

const usersService = {
  validateBody: (data) => {
    const schema = Joi.object({
      email: Joi.string().required(),
      name: Joi.string().required(),
      passwordHash: Joi.string().required().min(6),
      phone: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) throw error;

    return value;
  },

  list: async () => {
    const users = await db.User.findAll();
    return users;
  },

  create: async ({ email, passwordHash, name, phone }) => {
    const user = await db.User.create({ email, passwordHash, name, phone });
    return user;
  },

  findByIdLazy: async (id) => {
    const user = await db.User.findByPk(id, {
      attributes: { exclude: ['passwordHash', 'phone', 'createdAt', 'updatedAt'] },
    });

    const pets = await db.Pet.findAll({ where: { userId: user.id } });

    const userJSON = user.dataValues;

    const userWithPets = { ...userJSON, pets };

    if (!user) {
      const e = new Error('User not found');
      e.name = 'NotFoundError';
      throw e;
    }
    return userWithPets;
  },

  findByIdEager: async (id) => {
    const user = await db.User.findByPk(id, {
      attributes: { exclude: ['passwordHash', 'phone', 'createdAt', 'updatedAt'] },
      include: { model: db.Pet, as: 'pets' },
    });

    if (!user) {
      const e = new Error('User not found');
      e.name = 'NotFoundError';
      throw e;
    }
    return user;
  },
};

module.exports = usersService;