import express from 'express';
import sequelize from './modules/db.js';
import logger from './middlewares/logger.js';
import validarApiKey from './middlewares/validarApiKey.js';
import peliculaRoutes from './routes/route-pelicula.js';
 
const app = express();
const PORT = process.env.PORT || 3000;
 
// Middlewares globales
app.use(express.json());
app.use(logger); // Se aplica a TODAS las rutas
 
// Ruta de salud (sin autenticación)
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API RESTful de Películas',
    version: '1.0.0',
    autenticacion: 'Envía tu API Key como ?key=TU_KEY o en el header x-api-key',
    endpoints: {
      'GET    /peliculas':      'Obtener todas las películas',
      'GET    /peliculas/:id':  'Obtener una película por ID',
      'POST   /peliculas':      'Crear una película',
      'PUT    /peliculas/:id':  'Actualizar una película',
      'DELETE /peliculas/:id':  'Eliminar una película',
    },
  });
});
 
// validarApiKey aplicado a todas las rutas de /peliculas
app.use('/peliculas', validarApiKey, peliculaRoutes);
 
// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});
 
// Error handler global
app.use((err, req, res, next) => {
  console.error('Error interno:', err.message);
  res.status(500).json({ error: 'Error interno del servidor', detalle: err.message });
});
 
// Sincronizar BD y arrancar
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos SQLite sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`API Key activa: ${process.env.API_KEY || '12345'}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar la base de datos:', err);
  });
 
export default app;