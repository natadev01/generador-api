const mongoose = require('mongoose');

const ApiEndpointSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Nombre del endpoint
  method: { type: String, enum: ['GET', 'POST', 'PUT', 'DELETE'], required: true }, // Método HTTP
  path: { type: String, required: true, unique: true }, // Ruta del endpoint
  requestSchema: { type: Object, default: {} }, // Esquema de la solicitud
  responseSchema: { type: Object, default: {} }, // Esquema de la respuesta
  createdAt: { type: Date, default: Date.now }
});

// Índices para optimizar las búsquedas
ApiEndpointSchema.index({ path: 1, method: 1 }, { unique: true });

module.exports = mongoose.model('ApiEndpoint', ApiEndpointSchema);
