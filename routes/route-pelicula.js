import express from 'express';
const router = express.Router();
import { getAll, getById, create, update, drop } from '../services/serv-peliculas.js';
 
// GET /peliculas - Obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const peliculas = await getAll();
    res.json({
      total: peliculas.length,
      peliculas,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las películas', detalle: error.message });
  }
});
 
// GET /peliculas/:id - Obtener una película por ID
router.get('/:id', async (req, res) => {
  try {
    const pelicula = await getById(req.params.id);
    res.json(pelicula);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});
 
// POST /peliculas - Crear una película
router.post('/', async (req, res) => {
  try {
    const { titulo, director, anio, genero, duracion, sinopsis } = req.body;
 
    if (!titulo || !director || !anio || !genero || !duracion) {
      return res.status(400).json({
        error: 'Datos incompletos',
        mensaje: 'Los campos titulo, director, anio, genero y duracion son obligatorios',
      });
    }
 
    const nueva = await create({ titulo, director, anio, genero, duracion, sinopsis });
    res.status(201).json({
      mensaje: 'Película creada exitosamente',
      pelicula: nueva,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la película', detalle: error.message });
  }
});
 
// PUT /peliculas/:id - Actualizar una película
router.put('/:id', async (req, res) => {
  try {
    const actualizada = await update(req.params.id, req.body);
    res.json({
      mensaje: 'Película actualizada exitosamente',
      pelicula: actualizada,
    });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});
 
// DELETE /peliculas/:id - Eliminar una película
router.delete('/:id', async (req, res) => {
  try {
    const resultado = await drop(req.params.id);
    res.json(resultado);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});
 
export default router;