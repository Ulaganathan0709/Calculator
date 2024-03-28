let expression = '';
let history = [];

function appendNumber(number) {
    expression += number;
    updateDisplay();
}

function appendExpression(operator) {
    expression += operator;
    updateDisplay();
}

function calculatePercentage() {
    try {
        const result = eval(expression) / 100;
        expression = result.toString();
        updateDisplay();
    } catch (error) {
        alert('Invalid Expression');
        clearDisplay();
    }
}

function updateDisplay() {
    document.getElementById('result').value = expression;
}

function evaluateExpression() {
    try {
        const result = eval(expression);
        expression = result.toString();
        addToHistory(expression + ' = ' + result);
        updateDisplay();
    } catch (error) {
        alert('Invalid Expression');
        clearDisplay();
    }
}

function clearDisplay() {
    expression = '';
    updateDisplay();
}

function addToHistory(item) {
    history.unshift(item);
}

function showHistory() {
    const historyUI = document.getElementById('historyUI');
    const historyList = document.getElementById('historyList');

    // Clear previous history items
    historyList.innerHTML = '';

    // Populate history list
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });

    historyUI.style.display = 'block';
}

function hideHistory() {
    const historyUI = document.getElementById('historyUI');
    historyUI.style.display = 'none';
}

// Keyboard events
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (/[0-9]/.test(key)) {
        appendNumber(parseInt(key));
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendExpression(key);
    } else if (key === '%' || key === 'Shift' || key === '=') {
        calculatePercentage();
    } else if (key === 'Enter') {
        evaluateExpression();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === '.') {
        appendExpression('.');
    } else if (key === 'Backspace') {
        expression = expression.slice(0, -1);
        updateDisplay();
    } else {
        alert('Only numbers and operators (+, -, *, /, %) are allowed.');
    }
});
