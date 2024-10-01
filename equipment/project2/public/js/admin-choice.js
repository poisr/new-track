document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('choice-form');
    
    if (!form) {
        console.error('Form element not found');
        return;
    }

    window.submitChoice = (choice) => {
        if (choice === 'reports') {
            window.location.href = './reports.html';
        } else if (choice === 'equipment-form') {
            window.location.href = './action-selection.html';
        }else if (choice === 'inventory') {
            window.location.href = './stock_management.html';
        }else if (choice === 'Inventory-changes') {
            window.location.href = './action-selection-manage.html';
        }else {
            console.error('Choice is invalid:', choice);
        }
    };
});
