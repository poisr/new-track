// פונקציה לשליפת קטגוריות
async function loadCategories() {
    try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('שגיאה בטעינת קטגוריות');
        const categories = await response.json();
        const categorySelect = document.getElementById('categorySelect');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error(error.message);
        alert('לא ניתן לטעון קטגוריות');
    }
}

// פונקציה לשליפת מוצרים על פי קטגוריה
async function loadProductsByCategory(categoryId) {
    try {
        const response = await fetch(`/api/products/${categoryId}`);
        if (!response.ok) throw new Error('שגיאה בטעינת מוצרים');
        const products = await response.json();
        const productSelect = document.getElementById('productSelect');
        productSelect.innerHTML = '<option value="">בחר מוצר</option>'; // ניקוי המוצרים הקיימים
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
    } catch (error) {
        console.error(error.message);
        alert('לא ניתן לטעון מוצרים');
    }
}

// פונקציה לשליפת מודלים על פי מוצר
async function loadModelsByProduct(productId) {
    try {
        const response = await fetch(`/api/models/${productId}`);
        if (!response.ok) throw new Error('שגיאה בטעינת מודלים');
        const models = await response.json();
        const modelSelect = document.getElementById('modelSelect');
        modelSelect.innerHTML = '<option value="">בחר דגם</option>'; // ניקוי המודלים הקיימים
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model.id;
            option.textContent = model.name;
            modelSelect.appendChild(option);
        });
    } catch (error) {
        console.error(error.message);
        alert('לא ניתן לטעון מודלים');
    }
}

// פונקציה לשליפת פריטים על פי דגם
async function loadItemsByModel(modelId) {
    try {
        const response = await fetch(`/api/item/${modelId}`);
        if (!response.ok) throw new Error('שגיאה בטעינת פריטים');
        const items = await response.json();
        const itemSelect = document.getElementById('itemSelect');
        itemSelect.innerHTML = '<option value="">בחר פריט</option>'; // ניקוי הפריטים הקיימים
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            itemSelect.appendChild(option);
        });
    } catch (error) {
        console.error(error.message);
        alert('לא ניתן לטעון פריטים');
    }
}

// אירוע לבחירת קטגוריה
document.getElementById('categorySelect').addEventListener('change', (event) => {
    const categoryId = event.target.value;
    loadProductsByCategory(categoryId); // טען מוצרים לפי קטגוריה
});

// אירוע לבחירת מוצר
document.getElementById('productSelect').addEventListener('change', (event) => {
    const productId = event.target.value;
    loadModelsByProduct(productId); // טען מודלים לפי מוצר
});

// אירוע לבחירת דגם
document.getElementById('modelSelect').addEventListener('change', (event) => {
    const modelId = event.target.value;
    loadItemsByModel(modelId); // טען פריטים לפי דגם
});

// טעינת קטגוריות, מוצרים ומודלים כאשר הדף נטען
document.addEventListener('DOMContentLoaded', async () => {
    await loadCategories();
    // לא טוענים מוצרים ומודלים אוטומטית עד שלא נבחרה קטגוריה
});

// פונקציה למחיקת קטגוריה
async function deleteCategory(categoryId) {
    try {
        const response = await fetch(`/api/categories/${categoryId}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('שגיאה במחיקת קטגוריה');
        
        console.log('קטגוריה נמחקה בהצלחה:', categoryId);
        
        // רענן את רשימת הקטגוריות
        await loadCategories(); // טוען מחדש את הקטגוריות
        const categorySelect = document.getElementById('categorySelect');
        categorySelect.value = ''; // נקה את השדה הנוכחי אם יש צורך

    } catch (error) {
        console.error(error.message);
        alert('שגיאה במחיקת קטגוריה');
    }
}


// פונקציה למחיקת מוצר
async function deleteProduct(productId) {
    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('שגיאה במחיקת מוצר');
        
        console.log('מוצר נמחק בהצלחה:', productId);
        // רענן את רשימת המוצרים
        const categoryId = document.getElementById('categorySelect').value; // קבלת מזהה הקטגוריה הנוכחית
        loadProductsByCategory(categoryId);
    } catch (error) {
        console.error(error.message);
        alert('שגיאה במחיקת מוצר');
    }
}

// פונקציה למחיקת דגם
async function deleteModel(modelId) {
    try {
        const response = await fetch(`/api/models/${modelId}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('שגיאה במחיקת דגם');
        
        console.log('דגם נמחק בהצלחה:', modelId);
        // רענן את רשימת המודלים
        const productId = document.getElementById('productSelect').value; // קבלת מזהה המוצר הנוכחי
        loadModelsByProduct(productId);
    } catch (error) {
        console.error(error.message);
        alert('שגיאה במחיקת דגם');
    }
}

// פונקציה למחיקת פריט
async function deleteItem(itemId) {
    try {
        const response = await fetch(`/api/item/${itemId}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('שגיאה במחיקת פריט');
        
        console.log('פריט נמחק בהצלחה:', itemId);
        // רענן את רשימת המודלים
        const modelId = document.getElementById('modelSelect').value; // קבלת מזהה המוצר הנוכחי
        loadItemsByModel(modelId); // רענן את הפריטים תחת הדגם הנוכחי
    } catch (error) {
        console.error(error.message);
        alert('שגיאה במחיקת הפריט');
    }
}

// אירוע לבחירת מחיקת קטגוריה
document.getElementById('deleteCategory').addEventListener('click', () => {
    const categoryId = document.getElementById('categorySelect').value; // קבלת מזהה הקטגוריה

    // שימוש ב-SweetAlert להודעת אישור מחיקה
    Swal.fire({
        title: 'זהירות!',
        text: 'מחיקת הקטגוריה תמחק את כל הנתונים תחתיו, האם אתה בטוח שברצונך למחוק את הקטגוריה?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'כן, מחק',
        cancelButtonText: 'ביטול',
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            // אם המשתמש לחץ על "כן", מבוצעת המחיקה
            deleteCategory(categoryId);
            Swal.fire(
                'נמחק!',
                'הקטגוריה נמחקה בהצלחה.',
                'success'
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'בוטל',
                'הקטגוריה לא נמחקה.',
                'error'
            );
        }
    });
});

// אירוע לבחירת מחיקת מוצר
document.getElementById('deleteProduct').addEventListener('click', () => {
    const productId = document.getElementById('productSelect').value; // קבלת מזהה המוצר
    
    Swal.fire({
        title: 'זהירות!',
        text: 'מחיקת המוצר תמחק את כל הנתונים תחתיו, האם אתה בטוח שברצונך למחוק את המוצר?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'כן, מחק',
        cancelButtonText: 'ביטול',
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            // אם המשתמש לחץ על "כן", מבוצעת המחיקה
            deleteProduct(productId);
            Swal.fire(
                'נמחק!',
                'המוצר נמחק בהצלחה.',
                'success'
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'בוטל',
                'המוצר לא נמחק.',
                'error'
            );
        }
    });
});

// אירוע לבחירת מחיקת דגם
document.getElementById('deleteModel').addEventListener('click', () => {
    const modelId = document.getElementById('modelSelect').value; // קבלת מזהה הדגם
    
    Swal.fire({
        title: 'זהירות!',
        text: 'מחיקת הדגם תמחק את כל הנתונים תחתיו, האם אתה בטוח שברצונך למחוק את הדגם?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'כן, מחק',
        cancelButtonText: 'ביטול',
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            // אם המשתמש לחץ על "כן", מבוצעת המחיקה
            deleteModel(modelId);
            Swal.fire(
                'נמחק!',
                'הדגם נמחק בהצלחה.',
                'success'
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'בוטל',
                'הדגם לא נמחק.',
                'error'
            );
        }
    });
});

// אירוע לבחירת מחיקת פריט
document.getElementById('deleteItem').addEventListener('click', () => {
    const itemId = document.getElementById('itemSelect').value; // קבלת מזהה הפריט
    
    Swal.fire({
        title: 'זהירות!',
        text: 'האם אתה בטוח שברצונך למחוק את הפריט?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'כן, מחק',
        cancelButtonText: 'ביטול',
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            // אם המשתמש לחץ על "כן", מבוצעת המחיקה
            deleteItem(itemId);
            Swal.fire(
                'נמחק!',
                'הפריט נמחק בהצלחה.',
                'success'
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'בוטל',
                'הפריט לא נמחק.',
                'error'
            );
        }
    });
});
