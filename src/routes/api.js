const express = require('express');
const router = express.Router();
const ApiEndpoint = require('../models/ApiEndpoint');

// Middleware para parsear el cuerpo de la solicitud en JSON
router.use(express.json());

/**
 * @route   POST /api/endpoints
 * @desc    Crear un nuevo endpoint personalizado
 * @access  Público 
 */
router.post('/endpoints', async (req, res) => {
  try {
    const { name, method, path, requestSchema, responseSchema } = req.body;

    // Validar que el método sea uno de los permitidos
    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!allowedMethods.includes(method)) {
      return res.status(400).json({ error: 'Método HTTP no válido' });
    }

    // Validar que la ruta comience con '/'
    if (!path.startsWith('/')) {
      return res.status(400).json({ error: 'La ruta debe comenzar con "/"' });
    }

    // Crear y guardar el nuevo endpoint
    const nuevoEndpoint = new ApiEndpoint({ name, method, path, requestSchema, responseSchema });
    await nuevoEndpoint.save();

    res.status(201).json(nuevoEndpoint);
  } catch (error) {
    if (error.code === 11000) { // Error de duplicación
      res.status(400).json({ error: 'El endpoint ya existe' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

/**
 * @route   GET /api/endpoints
 * @desc    Obtener todos los endpoints personalizados
 * @access  Público
 */
router.get('/endpoints', async (req, res) => {
  try {
    const endpoints = await ApiEndpoint.find().sort({ createdAt: -1 });
    res.json(endpoints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/endpoints/:id
 * @desc    Obtener un endpoint por ID
 * @access  Público
 */
router.get('/endpoints/:id', async (req, res) => {
  try {
    const endpoint = await ApiEndpoint.findById(req.params.id);
    if (!endpoint) return res.status(404).json({ error: 'Endpoint no encontrado' });
    res.json(endpoint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   PUT /api/endpoints/:id
 * @desc    Actualizar un endpoint
 * @access  Público
 */
router.put('/endpoints/:id', async (req, res) => {
  try {
    const { name, method, path, requestSchema, responseSchema } = req.body;

    // Validar que el método sea uno de los permitidos
    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (method && !allowedMethods.includes(method)) {
      return res.status(400).json({ error: 'Método HTTP no válido' });
    }

    // Validar que la ruta comience con '/'
    if (path && !path.startsWith('/')) {
      return res.status(400).json({ error: 'La ruta debe comenzar con "/"' });
    }

    const endpoint = await ApiEndpoint.findByIdAndUpdate(
      req.params.id,
      { name, method, path, requestSchema, responseSchema },
      { new: true, runValidators: true, context: 'query' }
    );

    if (!endpoint) return res.status(404).json({ error: 'Endpoint no encontrado' });
    res.json(endpoint);
  } catch (error) {
    if (error.code === 11000) { // Error de duplicación
      res.status(400).json({ error: 'El endpoint ya existe' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

/**
 * @route   DELETE /api/endpoints/:id
 * @desc    Eliminar un endpoint
 * @access  Público
 */
router.delete('/endpoints/:id', async (req, res) => {
  try {
    const endpoint = await ApiEndpoint.findByIdAndDelete(req.params.id);
    if (!endpoint) return res.status(404).json({ error: 'Endpoint no encontrado' });
    res.json({ message: 'Endpoint eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Middleware para manejar dinámicamente los endpoints personalizados
 * Debe estar al final para que no interfiera con las rutas definidas
 */
router.use(async (req, res, next) => {
  try {
    // Buscar el endpoint que coincida con la ruta y el método
    const endpoint = await ApiEndpoint.findOne({ path: req.path, method: req.method });

    if (!endpoint) return next(); // Si no existe, pasar al siguiente middleware

    // Validar la solicitud según requestSchema si está definido
    if (Object.keys(endpoint.requestSchema).length > 0) {
      // Puedes implementar validaciones usando bibliotecas como Joi o Yup
      // Aquí simplemente verificamos que el cuerpo no esté vacío para métodos que lo requieran
      if (['POST', 'PUT'].includes(endpoint.method)) {
        if (!req.body || Object.keys(req.body).length === 0) {
          return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío' });
        }
        // Implementar validaciones más detalladas según requestSchema
      }
    }

    // Procesar la respuesta según responseSchema
    // Aquí simplemente respondemos con el objeto definido
    res.json(endpoint.responseSchema);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
