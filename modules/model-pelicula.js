import { DataTypes } from 'sequelize';
import sequelize from './db.js';

const Pelicula = sequelize.define('Pelicula', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duracion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Duración en minutos',
  },
  sinopsis: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'peliculas',
  timestamps: false,
});

export default Pelicula;