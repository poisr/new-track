const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // החלף למיקום הנכון של המודל

// שליפת מוצר לפי ID
router.get('/details/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'מוצר לא נמצא' });
        }
        res.json(product);
    } catch (error) {
        console.error('שגיאה בשליפת מוצר:', error);
        res.status(500).json({ error: 'שגיאה בשרת' });
    }
});

// הוספת מוצר
router.post('/', async (req, res) => {
    const { name, categoryId } = req.body;

    // בדיקת שדות חובה
    if (!name || !categoryId) {
        return res.status(400).json({ error: 'שם המוצר וקטגוריית המוצר הם שדות חובה' });
    }

    // בדיקת סוגים
    if (typeof name !== 'string' || typeof categoryId !== 'number') {
        return res.status(400).json({ error: 'שם המוצר צריך להיות מחרוזת וקטגוריית המוצר צריך להיות מספר' });
    }

    try {
        const newProduct = await Product.create({ name, categoryId });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('שגיאה בהוספת מוצר:', error);
        res.status(500).json({ error: 'שגיאה בהוספת מוצר' });
    }
});


// מחיקת מוצר
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.destroy({ where: { id: req.params.id } });
        if (deletedProduct) {
            res.status(200).send('מוצר נמחק בהצלחה!');
        } else {
            res.status(404).json({ error: 'מוצר לא נמצא' });
        }
    } catch (error) {
        console.error('שגיאה במחיקת מוצר:', error);
        res.status(500).json({ error: 'שגיאה במחיקת מוצר' });
    }
});

module.exports = router;
