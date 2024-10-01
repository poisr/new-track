const express = require('express');
const router = express.Router();
const Model = require('../models/model'); // הנחת שיש מודל בשם Model

// נתיב להחזרת דגמים לפי מזהה מוצר
router.get('/:productId', async (req, res) => {
    try {
        const models = await Model.findAll({ where: { productId: req.params.productId } });
        res.json(models);
    } catch (error) {
        console.error('שגיאה בשליפת דגמים:', error);
        res.status(500).json({ error: 'שגיאה בשליפת דגמים' });
    }
});

// הוספת דגם
router.post('/', async (req, res) => {
    const { name, productId, barcode } = req.body;

    // בדיקת שדות חובה (ללא הברקוד)
    if (!name || !productId) {
        return res.status(400).json({ error: 'שם הדגם ומזהה המוצר הם שדות חובה' });
    }

    try {
        // יצירת מודל חדש, הברקוד לא חייב להיות מסופק
        const newModel = await Model.create({ name, productId, barcode: barcode || null });
        res.status(201).json(newModel);
    } catch (error) {
        console.error('שגיאה בהוספת דגם:', error);
        res.status(500).json({ error: 'שגיאה בהוספת דגם' });
    }
});


// מחיקת דגם
router.delete('/:id', async (req, res) => {
    try {
        const deletedModel = await Model.destroy({ where: { id: req.params.id } });
        if (deletedModel) {
            res.status(200).send('דגם נמחק בהצלחה!');
        } else {
            res.status(404).json({ error: 'דגם לא נמצא' });
        }
    } catch (error) {
        console.error('שגיאה במחיקת דגם:', error);
        res.status(500).json({ error: 'שגיאה במחיקת דגם' });
    }
});

module.exports = router;
