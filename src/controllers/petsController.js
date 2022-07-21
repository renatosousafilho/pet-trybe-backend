const petsService = require('../services/petsService');

const petsController = {
  create: async (req, res) => {
    const { name, userId } = req.body;
  
    const pet = await petsService.create({ 
      userId,
      name,
    });
  
    res.status(201).json(pet);
  },

  list: async (req, res) => {
    const pets = await petsService.list();
    res.status(200).json(pets);
  },

  findById: async (req, res) => {
    const pet = await petsService.findById(req.params.id);

    res.status(200).json(pet);
  },
};

module.exports = petsController;
