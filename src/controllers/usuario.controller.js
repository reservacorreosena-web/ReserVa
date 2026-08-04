// Importamos el modelo de Usuario para poder interactuar con la base de datos
const Usuario = require('../models/Usuario.model');

// ==========================================
// FUNCIÓN 1: Obtener la lista de usuarios
// ==========================================
exports.obtenerUsuarios = async (req, res) => {
    try {
        // Busca todos los usuarios guardados en la base de datos
        const usuarios = await Usuario.find();

        // Responde con estado 200 (Éxito) y envía los usuarios encontrados
        res.status(200).json({
            ok: true,
            data: usuarios
        });
    } catch (error) {
        // Si ocurre un fallo en el servidor, responde con estado 500 (Error del servidor)
        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener usuarios',
            error: error.message
        });
    }
};

// ==========================================
// FUNCIÓN 2: Crear y guardar un nuevo usuario
// ==========================================
exports.crearUsuario = async (req, res) => {
    try {
        // Crea una instancia del usuario con la información que envía el cliente (req.body)
        const nuevoUsuario = new Usuario(req.body);

        // Guarda el nuevo usuario en MongoDB
        const usuarioGuardado = await nuevoUsuario.save();

        // Responde con estado 201 (Creado con éxito) y envía los datos guardados
        res.status(201).json({
            ok: true,
            mensaje: 'Usuario creado exitosamente',
            data: usuarioGuardado
        });
    } catch (error) {
        // Si falta un campo obligatorio o los datos son inválidos, responde con estado 400 (Petición incorrecta)
        res.status(400).json({
            ok: false,
            mensaje: 'Error al crear el usuario',
            error: error.message
        });
    }
};