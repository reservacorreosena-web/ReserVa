require('dotenv').config();

const express = require('express');
const path = require('path');
const conectarDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos
conectarDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));

// Middlewares Base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- COMENTAMOS ESTO TEMPORALMENTE ---
// const indexRoutes = require('./routes/indexRoutes');
// app.use('/', indexRoutes);

// Ruta base simple para probar
app.get('/', (req, res) => {
    res.send('Servidor corriendo correctamente');
});

// Arrancar Servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});