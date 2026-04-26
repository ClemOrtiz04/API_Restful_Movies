const API_KEY = process.env.API_KEY || '12345';
 
const validarApiKey = (req, res, next) => {
  // Acepta la key desde query param (?key=) o desde header (x-api-key)
  const apiKey = req.query.key || req.headers['x-api-key'];
 
  if (!apiKey) {
    return res.status(401).json({
      error: 'No autorizado',
      mensaje: 'Se requiere una API Key. Envíala como ?key=TU_KEY o en el header x-api-key',
    });
  }
 
  if (apiKey !== API_KEY) {
    return res.status(403).json({
      error: 'Acceso Prohibido',
      mensaje: 'API Key inválida',
    });
  }
 
  next();
};
 
export default validarApiKey;
 