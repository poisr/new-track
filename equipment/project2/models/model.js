const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Product = require('./product');

// יצירת המודל Model
const Model = sequelize.define('Model', {
    name: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    barcode: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id',
        },
        allowNull: true,
    },
}, {
    tableName: 'models',
    timestamps: false,
});

// הגדרת קשרים
Model.associate = (models) => {
    Model.belongsTo(models.Product, { foreignKey: 'productId', onDelete: 'CASCADE' });
};

module.exports = Model;
