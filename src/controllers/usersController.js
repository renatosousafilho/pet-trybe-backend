const usersService = require('../services/usersService');

const usersController = {
  list: async (req, res) => {
    const users = await usersService.list();
    res.status(200).json(users);
  },

  create: async (req, res) => {
    const { email, passwordHash, name, phone } = usersService.validateBody(req.body);

    const user = await usersService.create({ email, passwordHash, name, phone });

    res.status(201).json(user);
  },

  findById: async (req, res) => {
    const user = await usersService.findByIdLazy(req.params.id);

    res.status(200).json(user);
  },
};

module.exports = usersController;