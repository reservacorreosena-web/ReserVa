// src/config/database.js
const { Sequelize } = require('sequelize');
const path = require('path');

// Configurando SQLite (se guardará como un archivo local 'reservas.sqlite')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../reservas.sqlite'),
    logging: false // Cambia a true si quieres ver las consultas SQL en consola
});

module.exports = sequelize;