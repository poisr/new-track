document.addEventListener('DOMContentLoaded', function () {
    loadInventory();
    styleTable();
});

async function loadInventory() {
    try {
        const response = await fetch('https://new-track.onrender.com/api/inventory');
        if (!response.ok) {
            throw new Error('שגיאה בטעינת המלאי: ' + response.statusText);
        }

        const inventory = await response.json();
        console.log(inventory);

        const tableBody = document.querySelector('#inventoryTable tbody');
        tableBody.innerHTML = '';

        // אובייקט לאחסון דגמים ומספר הפריטים עבור כל דגם
        const modelData = {};

        inventory.forEach(item => {
            const modelKey = item.model; // להשתמש במודל כמפתח

            // אם הדגם לא קיים, ניצור אותו
            if (!modelData[modelKey]) {
                modelData[modelKey] = {
                    product: item.product,
                    category: item.category,
                    itemCount: parseInt(item.itemCount) || 0 // הוספת מספר פריטים לדגם
                };
            }
        });

        // יצירת השורות עבור כל דגם ייחודי
        Object.entries(modelData).forEach(([model, data]) => {
            const row = document.createElement('tr');

            // קטגוריה
            const categoryCell = document.createElement('td');
            categoryCell.textContent = data.category || 'N/A';
            row.appendChild(categoryCell);

            // מוצר
            const productCell = document.createElement('td');
            productCell.textContent = data.product || 'N/A';
            row.appendChild(productCell);

            // דגם
            const modelCell = document.createElement('td');
            modelCell.textContent = model || 'N/A';
            row.appendChild(modelCell);

            // מספר פריטים
            const itemCountCell = document.createElement('td');
            itemCountCell.textContent = data.itemCount || '0';
            row.appendChild(itemCountCell);

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('שגיאה בהצגת המלאי:', error);
    }
}

function styleTable() {
    const table = document.querySelector('#inventoryTable');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';

    // סגנונות עבור התאים בכותרת
    const headerCells = table.querySelectorAll('th');
    headerCells.forEach(cell => {
        cell.style.backgroundColor = '#4CAF50'; // צבע רקע ירוק
        cell.style.color = 'white'; // צבע טקסט לבן
        cell.style.padding = '12px'; // ריווח פנימי
        cell.style.textAlign = 'left'; // יישור טקסט לשמאל
    });

    // סגנונות עבור התאים בגוף הטבלה
    const bodyCells = table.querySelectorAll('td');
    bodyCells.forEach(cell => {
        cell.style.border = '1px solid #ddd'; // גבול תאים אפור בהיר
        cell.style.padding = '8px'; // ריווח פנימי
    });

    // סגנונות עבור שורות
    const rows = table.querySelectorAll('tr');
    rows.forEach((row, index) => {
        if (index % 2 === 0) {
            row.style.backgroundColor = '#f2f2f2'; // צבע רקע אפור בהיר לשורות זוגיות
        }
    });

    // הוספת אפקט ריחוף על השורות
    rows.forEach(row => {
        row.addEventListener('mouseover', () => {
            row.style.backgroundColor = '#ddd'; // צבע רקע אפור כהה בריחוף
        });
        row.addEventListener('mouseout', () => {
            if (row.style.backgroundColor !== 'rgba(76, 175, 80, 1)') {
                row.style.backgroundColor = ''; // מחזירים צבע רקע ברירת מחדל
            }
        });
    });
}

document.getElementById('exportBtn').addEventListener('click', exportToExcel);

function exportToExcel() {
    const table = document.getElementById('inventoryTable');
    const wb = XLSX.utils.book_new(); // יצירת ספר חדש
    const ws = XLSX.utils.table_to_sheet(table); // יצירת גיליון מהטבלה

    // הוספת גיליון לספר
    XLSX.utils.book_append_sheet(wb, ws, "InventoryData");

    // התאמת רוחב התאים
    const colWidth = [];
    for (let i = 0; i < ws['!ref'].split(':')[1].charCodeAt(0) - 65 + 1; i++) {
        const column = String.fromCharCode(65 + i); // קבלת שם העמודה (A, B, C וכו')
        let maxWidth = 0;

        // חישוב הרוחב המקסימלי של התאים בעמודה
        for (const cell in ws) {
            if (cell.startsWith(column)) {
                const cellValue = ws[cell].v ? ws[cell].v.toString() : '';
                maxWidth = Math.max(maxWidth, cellValue.length);
            }
        }

        colWidth.push({ wch: maxWidth + 2 }); // הוספת רוחב לתוצאה (2 רווחים נוספים)
    }

    ws['!cols'] = colWidth; // הגדרת רוחב העמודות בגיליון

    // שמירת הקובץ
    XLSX.writeFile(wb, 'inventory_data.xlsx');
}

