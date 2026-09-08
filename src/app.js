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
        return res.redirect('/login');
    }
    next();
};

// Permitir que Express sirva archivos estáticos (CSS, imágenes, JS del cliente)
app.use(express.static('public'));

// --- RUTAS ---

// Landing page, inicio ReserVa
app.get('/', (req, res) => {
    res.render('landing_usuario', { 
        usuarioId: req.session.usuarioId || null 
    });
});

// 2. Vista de Login
app.get('/login', (req, res) => {
    if (req.session.usuarioId) return res.redirect('/dashboard');
    res.render('login', { error: null });
});

// Procesar Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });
        
        if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
            return res.render('login', { error: "Correo o contraseña incorrectos" });
        }

        req.session.usuarioId = usuario.id;
        req.session.email = usuario.email;
        res.redirect('/dashboard');
    } catch (error) {
        res.render('login', { error: "Error en el servidor" });
    }
});

// 3. Vista de Registro
app.get('/register', (req, res) => {
    if (req.session.usuarioId) return res.redirect('/dashboard');
    res.render('register', { error: null });
});

// Procesar Registro
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existe = await Usuario.findOne({ where: { email } });
        
        if (existe) {
            return res.render('register', { error: "El correo ya está registrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await Usuario.create({ email, password: hashedPassword });

        res.redirect('/login');
    } catch (error) {
        res.render('register', { error: "Error al registrar la cuenta" });
    }
});

// 4. Panel (Dashboard) - Protegido
app.get('/dashboard', verificarAuth, async (req, res) => {
    try {
        const reservas = await Reserva.findAll({ where: { usuarioId: req.session.usuarioId } });
        res.render('dashboard', { reservas, email: req.session.email });
    } catch (error) {
        res.status(500).send("Error cargando el panel");
    }
});

// 5. Crear Reserva - Protegido
app.post('/reservas/crear', verificarAuth, async (req, res) => {
    try {
        const { fecha, hora, cantidad_personas, mesa } = req.body;
        
        // Mapeo seguro con los campos que recibe tu base de datos
        await Reserva.create({
            cliente: req.session.email, // O el nombre que tengas en sesión
            plato: `Mesa ${mesa} - ${cantidad_personas} Pers. (${fecha} ${hora})`,
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