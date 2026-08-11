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

// Ruta base para renderizar tu vista index.ejs
app.get('/', (req, res) => {
    res.render('index');
});

// --- RUTAS TEMPORALES PARA PROBAR EL CAPTCHA ---
app.get('/test-captcha', (req, res) => {
    res.render('test-captcha');
});

app.post('/probar-captcha', (req, res) => {
    const tokenCaptcha = req.body['g-recaptcha-response'];

    if (!tokenCaptcha) {
        return res.send('<h2>❌ ¡Pilas! No completaste el captcha o eres un robot.</h2>');
    }

    res.send('<h2>✅ ¡Excelente! El token del captcha llegó perfecto al servidor.</h2>');
});

// Arrancar Servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});