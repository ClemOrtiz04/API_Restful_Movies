const logger = (req, res, next) => {
  const fecha = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });
  const inicio = Date.now();
 
  // Se engancha al evento 'finish' para loggear cuando la respuesta ya fue enviada
  res.on('finish', () => {
    const duracion = Date.now() - inicio;
    const statusColor =
      res.statusCode >= 500 ? '\x1b[31m' : // rojo
      res.statusCode >= 400 ? '\x1b[33m' : // amarillo
      res.statusCode >= 200 ? '\x1b[32m' : // verde
      '\x1b[0m';
 
    console.log(
      `[${fecha}] ${req.method} ${req.url} ${statusColor}${res.statusCode}\x1b[0m - ${duracion}ms`
    );
  });
 
  next();
};
 
export default logger;