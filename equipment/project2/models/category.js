const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// יצירת המודל Category
const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false, // שם הקטגוריה חייב להיות מלא
    },
}, {
    tableName: 'categories',
    timestamps: false, // אם אין צורך בתאריכי יצירה ועדכון
});

// קשרים
Category.associate = (models) => {
    // הגדרת קשר hasMany עם מודל Product
    Category.hasMany(models.Product, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
};

module.exports = Category;
