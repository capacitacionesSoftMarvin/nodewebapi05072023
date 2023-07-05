const Client = require('../models/client');

// Obtener todos los clientes
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
};

// Obtener un cliente por su ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el cliente' });
  }
};

// Crear un nuevo cliente
exports.createClient = async (req, res) => {
  try {
    const newClient = new Client(req.body);
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el cliente' });
  }
};

// Actualizar un cliente existente
exports.updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedClient) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
};

// Eliminar un cliente existente
exports.deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndRemove(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
};
