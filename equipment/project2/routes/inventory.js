const express = require('express');
const router = express.Router();
const Item = require('../models/items');
const Model = require('../models/model');
const Product = require('../models/product');
const Category = require('../models/category');

// קביעת הקשרים לפני השאילתא
Item.belongsTo(Model, { foreignKey: 'modelId' });
Model.belongsTo(Product, { foreignKey: 'productId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll({
            include: [{
                model: Model,
                include: [{
                    model: Product,
                    include: [Category]
                }]
            }]
        });
        
        const formattedItems = items.map(item => ({
            id: item.id,
            name: item.name,
            model: item.Model?.name || 'N/A',
            product: item.Model?.Product?.name || 'N/A',
            category: item.Model?.Product?.Category?.name || 'N/A',
            type: item.type 
        }));

        // ספירת מספר הפריטים לכל דגם
        const itemCountByModel = formattedItems.reduce((acc, item) => {
            acc[item.model] = (acc[item.model] || 0) + 1;
            return acc;
        }, {});

        // הוספת מספר הפריטים לדגמים
        const itemsWithCounts = formattedItems.map(item => ({
            ...item,
            itemCount: itemCountByModel[item.model] || 0 
        }));

        console.log(itemsWithCounts);
        res.json(itemsWithCounts); 
    } catch (error) {
        console.error('שגיאה בהצגת המלאי:', error);
        res.status(500).json({ error: 'שגיאה בטעינת המלאי' });
    }
});

module.exports = router;
