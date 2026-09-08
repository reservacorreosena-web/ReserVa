
const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://reservacorreosena_db_user:reservapassword@cluster0.0syjot6.mongodb.net/Reserva');
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1); 
    }
};

module.exports = conectarDB;