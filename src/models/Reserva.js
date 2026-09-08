const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Reserva = sequelize.define('Reserva', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plato: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mesa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: 'Pendiente'
    }
});

// Relación: Un usuario puede tener muchas reservas (Foreign Key automática)
Usuario.hasMany(Reserva, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
Reserva.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = { sequelize, Usuario, Reserva };