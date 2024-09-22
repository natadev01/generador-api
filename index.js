const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/db');

const apiRoutes = require('./src/routes/api');

const app = express();

// Middleware
app.use(bodyParser.json());

// Conexión a MongoDB
connectDB();

// Rutas
app.use('/api', apiRoutes);

// Ruta por defecto
app.get('/', (req, res) => {
  res.send('API Generadora en funcionamiento');
});

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
