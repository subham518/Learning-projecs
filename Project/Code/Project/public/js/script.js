// ========== Factorial ========== //
const factorialForm = document.getElementById('factorialForm');
if (factorialForm) {
  factorialForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const n = parseInt(document.getElementById('factorialInput').value);
    let result = 1;
    let error = "";
    if (isNaN(n) || n < 0) {
      error = "Please enter a non-negative integer.";
    } else if (n > 170) {
      // JS can't safely handle factorials for large n due to Infinity
      error = "Number too large for accurate computation.";
    } else {
      for (let i = 2; i <= n; i++) result *= i;
    }
    document.getElementById('factorialResult').textContent = error ? error : `n! = ${result}`;
  });
}

// ========== Prime Checker ========== //
const primeForm = document.getElementById('primeForm');
if (primeForm) {
  primeForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const num = parseInt(document.getElementById('primeInput').value);
    let result = '';
    if (isNaN(num) || num < 2) {
      result = 'Please enter an integer greater than 1.';
    } else {
      let isPrime = true;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
          isPrime = false;
          break;
        }
      }
      result = isPrime ? 'Prime' : 'Not Prime';
    }
    document.getElementById('primeResult').textContent = result;
  });
}

// ========== Arithmetic Calculator ========== //
const arithmeticForm = document.getElementById('arithmeticForm');
if (arithmeticForm) {
  arithmeticForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const num1 = parseFloat(document.getElementById('arithNum1').value);
    const num2 = parseFloat(document.getElementById('arithNum2').value);
    const op = document.getElementById('arithOp').value;
    let result = '';
    if (isNaN(num1) || isNaN(num2)) {
      result = 'Please enter both numbers.';
    } else {
      switch(op) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/':
          if (num2 === 0) result = "Cannot divide by zero.";
          else result = num1 / num2;
          break;
        default: result = "Unknown operation.";
      }
    }
    document.getElementById('arithmeticResult').textContent = isNaN(result) ? result : `Result: ${result}`;
  });
}
