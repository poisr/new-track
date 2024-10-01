const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Model = require('./model'); // ייבוא של המודל Model

// יצירת המודל Item
const Item = sequelize.define('Item', {
    name: {
        type: DataTypes.STRING,
        allowNull: false, // חובה
    },
    barcode: {
        type: DataTypes.STRING,
        allowNull: true, // תוכל לשנות ל-false אם הברקוד הוא חובה
        unique: true, // להבטיח שכל ברקוד הוא ייחודי
    },
    modelId: {
        type: DataTypes.INTEGER, // או STRING בהתאם למודל Model
        references: {
            model: Model,
            key: 'id',
        },
        allowNull: false, // חובה
    },
}, {
    tableName: 'items', // שם הטבלה במסד הנתונים
    timestamps: false, // אם אין לך תאריכי יצירה ועדכון
});

// הגדרת קשרים
Item.belongsTo(Model, { foreignKey: 'modelId', onDelete: 'CASCADE' }); // הוסף onDelete: 'CASCADE'
Model.hasMany(Item, { foreignKey: 'modelId', onDelete: 'CASCADE' }); // ודא שיש קשר דו-כיווני

module.exports = Item;
