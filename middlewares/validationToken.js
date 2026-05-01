import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../services/serv.token.js';

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: 'Token requerido' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }
        req.user = decoded; // Guardamos los datos del usuario en la petición
        next();
    });
};

export default verificarToken;