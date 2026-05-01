import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());

export const SECRET_KEY = 'this_is_the_most_secret_key_ever';

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simulación de validación de usuario
    if (username === 'cortiz18' && password === 'clemente18') {
        const user = { id: 1, name: 'Heber' };

        // Generar JWT (expira en 2 horas)
        const token = jwt.sign(user, SECRET_KEY, { expiresIn: '2h' });
        res.json({ message: 'Login exitoso', token });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
});

export default app;