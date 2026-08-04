const Usuario =requiere('../models/usuario.model')

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json({
            ok: true,
            data: usuarios
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener usuarios',
            error: error.message
        });
    }
};

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        const usuarioGuardado = await nuevoUsuario.save();

        res.status(201).json({
            ok: true,
            mensaje: 'Usuario creado exitosamente',
            data: usuarioGuardado
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            mensaje: 'Error al crear el usuario',
            error: error.message
        });
    }
};