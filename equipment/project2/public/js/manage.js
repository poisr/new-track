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

// טעינת קטגוריות, מוצרים ומודלים כאשר הדף נטען
document.addEventListener('DOMContentLoaded', async () => {
    await loadCategories();
    // לא טוענים מוצרים ומודלים אוטומטית עד שלא נבחרה קטגוריה
});

document.getElementById('addCategory').addEventListener('click', async () => {
    const categoryName = document.getElementById('newCategory').value.trim(); // קבלת שם הקטגוריה
    if (!categoryName) {
        Swal.fire({
            icon: 'warning',
            title: 'נא למלא שם קטגוריה',
            timer: 3000, // ההודעה תיעלם אחרי 3 שניות
            timerProgressBar: true,
            showConfirmButton: false,
        });
        return;
    }

    try {
        const response = await fetch('/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: categoryName }),
        });

        if (!response.ok) throw new Error('שגיאה בהוספת קטגוריה');
        
        const newCategory = await response.json();
        console.log('קטגוריה חדשה נוספה:', newCategory);

        // הוספת הקטגוריה לרשימה של קטגוריות
        const categorySelect = document.getElementById('categorySelect');
        const option = document.createElement('option');
        option.value = newCategory.id; // הנחה שהמזהה חוזר עם התגובה
        option.textContent = newCategory.name;
        categorySelect.appendChild(option);

        // ניקוי שדה הקטגוריה לאחר הוספה
        document.getElementById('newCategory').value = '';

        // הודעה של הצלחה
        Swal.fire({
            icon: 'success',
            title: 'קטגוריה נוספה בהצלחה!',
            timer: 3000, // ההודעה תיעלם אחרי 3 שניות
            timerProgressBar: true,
            showConfirmButton: false,
        });

    } catch (error) {
        console.error('שגיאה בהוספת קטגוריה:', error.message);
        Swal.fire({
            icon: 'error',
            title: 'שגיאה בהוספת קטגוריה',
            text: error.message,
            timer: 3000, // ההודעה תיעלם אחרי 3 שניות
            timerProgressBar: true,
            showConfirmButton: false,
        });
    }
});

async function loadCategories() {
    try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('שגיאה בטעינת קטגוריות');
        const categories = await response.json();
        const categorySelect = document.getElementById('categorySelect');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id; // הנחה שהמזהה חוזר עם התגובה
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('שגיאה בטעינת קטגוריות:', error.message);
        alert('לא ניתן לטעון קטגוריות');
    }
}

// טעינת קטגוריות כאשר הדף נטען
document.addEventListener('DOMContentLoaded', loadCategories);

document.getElementById('addProduct').addEventListener('click', async () => {
    const name = document.getElementById('newProduct').value;
    const categoryId = parseInt(document.getElementById('categorySelect').value, 10);

    // בדוק אם השדות מלאים
    if (!name || !categoryId) {
        // alert('אנא מלא את כל השדות הנדרשים!');
        Swal.fire({
            icon: 'warning',
            title: 'אנא מלא את כל השדות הנדרשים!',
            timer: 3000, // ההודעה תיעלם אחרי 3 שניות
            timerProgressBar: true,
            showConfirmButton: false,
        });
        return;
    }

    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, categoryId }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error('Error response:', errorResponse);
            alert('שגיאה בהוספת מוצר: ' + errorResponse.error);
        } else {
            const newProduct = await response.json();
            console.log('מוצר נוסף בהצלחה:', newProduct);

            Swal.fire({
                icon: 'success',
                title: 'מוצר/יצרן נוסף בהצלחה!',
                timer: 3000, 
                timerProgressBar: true,
                showConfirmButton: false,
            });

            const productSelect = document.getElementById('productSelect');
            const option = document.createElement('option');
            option.value = newProduct.id; // הנחה שהמזהה חוזר עם התגובה
            option.textContent = newProduct.name;
            productSelect.appendChild(option);
            // כאן תוכל להוסיף קוד לעדכון התצוגה או לרענן את הנתונים
        }
    } catch (error) {
        console.error('שגיאה בשליחה:', error);
        // alert('שגיאה בשליחה. אנא נסה שוב מאוחר יותר.');
        Swal.fire({
            icon: 'error',
            title: 'שגיאה בהוספת מוצר/יצרן',
            text: error.message,
            timer: 3000, 
            timerProgressBar: true,
            showConfirmButton: false,
        });
    }
});

// אירוע להוספת דגם
document.getElementById('addModel').addEventListener('click', async () => {
    const modelName = document.getElementById('newModel').value.trim(); // קבלת שם הדגם
    const productId = parseInt(document.getElementById('productSelect').value, 10); // קבלת מזהה המוצר
    const modelBarcode = document.getElementById('modelBarcode').value.trim(); // קבלת ברקוד הדגם

    // בדוק אם השדות מלאים
    if (!modelName || !productId) {
        // alert('אנא מלא את כל השדות הנדרשים!');
        Swal.fire({
            icon: 'warning',
            title: 'אנא מלא את כל השדות הנדרשים!',
            timer: 3000, 
            timerProgressBar: true,
            showConfirmButton: false,
        });
        return;
    }

    try {
        const response = await fetch('/api/models', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: modelName, productId, barcode: modelBarcode }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error('Error response:', errorResponse);
            // alert('שגיאה בהוספת דגם: ' + errorResponse.error);
            Swal.fire({
                icon: 'error',
                title: 'שגיאה בהוספת דגם',
                text: error.message,
                timer: 3000, 
                timerProgressBar: true,
                showConfirmButton: false,
            });
        } else {
            const newModel = await response.json();
            console.log('דגם נוסף בהצלחה:', newModel);
            Swal.fire({
                icon: 'success',
                title: 'דגם נוסף בהצלחה!',
                timer: 3000, 
                timerProgressBar: true,
                showConfirmButton: false,
            });
            
            // עדכון רשימת המודלים
            const modelSelect = document.getElementById('modelSelect');
            const option = document.createElement('option');
            option.value = newModel.id; // הנחה שהמזהה חוזר עם התגובה
            option.textContent = newModel.name;
            modelSelect.appendChild(option);

            // ניקוי שדות הדגם לאחר הוספה
            document.getElementById('newModel').value = '';
            document.getElementById('modelBarcode').value = '';
        }
    } catch (error) {
        console.error('שגיאה בשליחה:', error);
        alert('שגיאה בשליחה. אנא נסה שוב מאוחר יותר.');
    }
});



document.getElementById('addItem').addEventListener('click', async () => {
    const itemName = document.getElementById('newItem').value.trim(); // קבלת שם הפריט
    const modelId = parseInt(document.getElementById('modelSelect').value, 10); // קבלת מזהה הדגם
    const itemBarcode = document.getElementById('itemBarcode').value.trim(); // קבלת ברקוד הפריט

    // בדוק אם השדות מלאים
    if (!itemName || !modelId) {
        // alert('אנא מלא את כל השדות הנדרשים!');
        Swal.fire({
            icon: 'warning',
            title: 'אנא מלא את כל השדות הנדרשים!',
            timer: 3000, 
            timerProgressBar: true,
            showConfirmButton: false,
        });
        return;
    }

    try {
        const response = await fetch('/api/item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: itemName, modelId, barcode: itemBarcode }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error('Error response:', errorResponse);
            // alert('שגיאה בהוספת פריט: ' + errorResponse.error);
            Swal.fire({
                icon: 'warning',
                title: 'שגיאה בהוספת פריט!',
                timer: 3000, 
                timerProgressBar: true,
                showConfirmButton: false,
            });
        } else {
            const newItem = await response.json();
            console.log('פריט נוסף בהצלחה:', newItem);
            Swal.fire({
                icon: 'warning',
                title: 'פריט נוסף בהצלחה!',
                timer: 3000, 
                timerProgressBar: true,
                showConfirmButton: false,
            });
            
            // עדכון רשימת הפריטים
            // const itemSelect = document.getElementById('itemSelect');
            // const option = document.createElement('option');
            // option.value = newItem.id; // הנחה שהמזהה חוזר עם התגובה
            // option.textContent = newItem.name;
            // itemSelect.appendChild(option);

            // ניקוי שדות הפריט לאחר הוספה
            document.getElementById('newItem').value = '';
            document.getElementById('itemBarcode').value = '';
        }
    } catch (error) {
        console.error('שגיאה בשליחה:', error);
        // alert('שגיאה בשליחה. אנא נסה שוב מאוחר יותר.');
        Swal.fire({
            icon: 'warning',
            title: 'שגיאה בשליחה. אנא נסו שוב מאוחר יותר!',
            timer: 3000, 
            timerProgressBar: true,
            showConfirmButton: false,
        });
    }
});
