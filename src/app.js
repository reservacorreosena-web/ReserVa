// src/app.js
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const { sequelize, Usuario, Reserva } = require('./models/Reserva');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'reserva_secret_key_pro',
    resave: false,
    saveUninitialized: false
}));

// Middleware para proteger rutas privadas
const verificarAuth = (req, res, next) => {
    if (!req.session.usuarioId) {
        return res.redirect('/');
    }
    next();
};

// --- RUTAS ---

// 1. Login / Registro (Vista)
app.get('/', (req, res) => {
    if (req.session.usuarioId) return res.redirect('/dashboard');
    res.render('login', { error: null, mensaje: null });
});

// 2. Procesar Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });
        
        if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
            return res.render('login', { error: "Credenciales inválidas", mensaje: null });
        }

        req.session.usuarioId = usuario.id;
        req.session.email = usuario.email;
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.render('login', { error: "Error en el servidor", mensaje: null });
    }
});

// 3. Procesar Registro
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existe = await Usuario.findOne({ where: { email } });
        
        if (existe) {
            return res.render('login', { error: "El correo ya está registrado", mensaje: null });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await Usuario.create({ email, password: hashedPassword });

        res.render('login', { error: null, mensaje: "¡Cuenta creada con éxito! Inicia sesión." });
    } catch (error) {
        console.log(error);
        res.render('login', { error: "Error al registrar", mensaje: null });
    }
});

// 4. Panel (Dashboard) - Protegido
app.get('/dashboard', verificarAuth, async (req, res) => {
    try {
        const reservas = await Reserva.findAll({ where: { usuarioId: req.session.usuarioId } });
        res.render('dashboard', { reservas, email: req.session.email });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error cargando el panel");
    }
});

// 5. Crear Reserva - Protegido
app.post('/reservas/crear', verificarAuth, async (req, res) => {
    try {
        const { cliente, plato, mesa } = req.body;
        await Reserva.create({
            cliente,
            plato,
            mesa,
            usuarioId: req.session.usuarioId
        });
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al crear reserva");
    }
});

// 6. Cerrar Sesión
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Inicializar base de datos y arrancar servidor
sequelize.sync().then(() => {
    console.log('📦 Base de datos conectada y sincronizada correctamente');
    app.listen(PORT, () => {
        console.log(`🚀 ReserVa Pro corriendo en http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('❌ Error al conectar la base de datos:', err);
});