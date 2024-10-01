const express = require('express');
const router = express.Router();
const Category = require('../models/category'); // החלף למיקום הנכון של המודל

// שליפת קטגוריה לפי ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id); // שימוש ב-findByPk
        if (!category) {
            return res.status(404).json({ error: 'קטגוריה לא נמצאה' });
        }
        res.json(category);
    } catch (error) {
        console.error('שגיאה בשרת:', error);
        res.status(500).json({ error: 'שגיאה בשרת' });
    }
});

// הוספת קטגוריה
router.post('/', async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'שם הקטגוריה לא יכול להיות ריק' });
    }
    try {
        const newCategory = await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('שגיאה בהוספת קטגוריה:', error);
        res.status(500).json({ error: 'שגיאה בהוספת קטגוריה' });
    }
});

router.delete('/:id', async (req, res) => {
    console.log(`מנסים למחוק קטגוריה עם ID: ${req.params.id}`);
    try {
        const deletedCategory = await Category.destroy({ where: { id: req.params.id } });
        if (deletedCategory) {
            res.status(200).send('קטגוריה נמחקה בהצלחה!');
        } else {
            res.status(404).json({ error: 'קטגוריה לא נמצאה' });
        }
    } catch (error) {
        console.error('שגיאה במחיקת קטגוריה:', error);
        res.status(500).json({ error: 'שגיאה במחיקת קטגוריה' });
    }
});


module.exports = router;
