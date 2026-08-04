// 1. Importar express
const express = require('express');

// 2. Inicializar la app
const app = express();

// 3. Definir el puerto
const PORT = process.env.PORT || 3000;

// 4. Ruta raíz que responde con el "Hola Mundo"
app.get('/', (req, res) => {
    res.send('<h1>¡Hola Mundo desde ReserVa!</h1><p>El servidor base está corriendo correctamente.</p>');
});

// 5. Encender el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});