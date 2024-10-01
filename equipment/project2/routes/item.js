const express = require('express');
const router = express.Router();
const Item = require('../models/items'); // עדכון לשם החדש

// נתיב להחזרת פריטים לפי מזהה דגם
// Route to get items by model ID
router.get('/:modelId', async (req, res) => {
    try {
        const items = await Item.findAll({ where: { modelId: req.params.modelId } });
        
        // אם לא נמצאו פריטים, מחזירים מערך ריק
        res.json(items); // זה תמיד יהיה מערך (יכול להיות ריק)
    } catch (error) {
        console.error('שגיאה בשליפת פריטים:', error);
        res.status(500).json({ error: 'שגיאה בשליפת פריטים' });
    }
});


// הוספת פריט
router.post('/', async (req, res) => {
    const { name, modelId, barcode } = req.body;

    // בדיקת שדות חובה
    if (!name || !modelId) {
        return res.status(400).json({ error: 'שם הפריט, מזהה הדגם וקוד הברקוד הם שדות חובה' });
    }

    try {
        const newItem = await Item.create({ name, modelId, barcode });
        res.status(201).json(newItem); // מחזיר את הפריט שנוסף
    } catch (error) {
        console.error('שגיאה בהוספת פריט:', error);
        res.status(500).json({ error: 'שגיאה בהוספת פריט' });
    }
});

// מחיקת פריט
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Item.destroy({ where: { id: req.params.id } });
        if (deletedItem) {
            res.status(200).send('פריט נמחק בהצלחה!');
        } else {
            res.status(404).json({ error: 'פריט לא נמצא' });
        }
    } catch (error) {
        console.error('שגיאה במחיקת פריט:', error);
        res.status(500).json({ error: 'שגיאה במחיקת פריט' });
    }
});

module.exports = router;
