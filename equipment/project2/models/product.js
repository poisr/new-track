const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Category = require('./category');

// יצירת המודל Product
const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    tableName: 'products',
    timestamps: false,
});

// הגדרת קשרים
Product.associate = (models) => {
    Product.belongsTo(models.Category, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
    Product.hasMany(models.Model, { foreignKey: 'productId', onDelete: 'CASCADE' }); // ודא שמודול Model קיים
};

module.exports = Product;
