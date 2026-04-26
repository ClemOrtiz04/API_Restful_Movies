import Pelicula from '../modules/model-pelicula.js';
 
const getAll = async () => {
  return await Pelicula.findAll();
};
 
const getById = async (id) => {
  const pelicula = await Pelicula.findByPk(id);
  if (!pelicula) {
    const error = new Error(`Película con id ${id} no encontrada`);
    error.status = 404;
    throw error;
  }
  return pelicula;
};
 
const create = async (datos) => {
  return await Pelicula.create(datos);
};
 
const update = async (id, datos) => {
  const pelicula = await getById(id);
  return await pelicula.update(datos);
};
 
const drop = async (id) => {
  const pelicula = await getById(id);
  await pelicula.destroy();
  return { mensaje: `Película con id ${id} eliminada correctamente` };
};
 
export {
  getAll,
  getById,
  create,
  update,
  drop,
};