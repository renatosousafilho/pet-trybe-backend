const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');

const authService = {
  validateBody: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    });

    const { error, value } = schema.validate(data);

    if (error) throw error;
    
    return value;
  },

  login: async (email, password) => {
    const user = await db.User.findOne({ 
      attributes: { exclude: ['phone', 'createdAt', 'updatedAt'] },
      where: { email }, 
    });

    if (!user || user.passwordHash !== password) {
      const e = new Error('Usuário não existe ou senha inválida');
      e.name = 'UnauthorizedError';
      throw e;
    }

    const { passwordHash, ...userWithoutPassword } = user.dataValues;

    const token = jwtService.createToken(userWithoutPassword);

    return token;
  },

  validateToken: (token) => {
    const data = jwtService.validateToken(token);

    return data;
  },
};

module.exports = authService;