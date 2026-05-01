import express from 'express';
import sequelize from './modules/db.js';
import logger from './middlewares/logger.js';
import validarApiKey from './middlewares/validarApiKey.js';
import peliculaRoutes from './routes/route-pelicula.js';
import verificarToken from './middlewares/validationToken.js';
import authRoutes from './services/serv.token.js';

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
    autenticacion: 'Primero haz POST /login con credenciales para obtener token JWT',
    endpoints: {
      'POST   /login':          'Obtener JWT token (username: cortiz18, password: clemente18)',
      'GET    /peliculas':      'Obtener todas las películas (requiere token)',
      'GET    /peliculas/:id':  'Obtener una película por ID (requiere token)',
      'POST   /peliculas':      'Crear una película (requiere token)',
      'PUT    /peliculas/:id':  'Actualizar una película (requiere token)',
      'DELETE /peliculas/:id':  'Eliminar una película (requiere token)',
    },
  });
});
 
// Rutas de autenticación (SIN protección de token)
app.use('/', authRoutes);
 
// Middleware validarApiKey y verificarToken aplicados a todas las rutas de /peliculas
app.use('/peliculas', validarApiKey, verificarToken, peliculaRoutes);
 
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