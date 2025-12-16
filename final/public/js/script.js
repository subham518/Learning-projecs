// Factorial //
const factorialForm = document.getElementById('factorialForm');
if (factorialForm) {
  factorialForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const n = parseInt(document.getElementById('factorialInput').value);
    let result = 1;
    let error = "";
    let steps = "";

    if (isNaN(n) || n < 0) {
      error = "Please enter a non-negative integer.";
    } else if (n > 170) {
      error = "Number too large for accurate computation.";
    } else {
      let factorialSteps = [];
      for (let i = 2; i <= n; i++) {
        result *= i;
        factorialSteps.push(i);
      }
      steps = n === 0 || n === 1 ? "1" : factorialSteps.join(' × ');
    }

    document.getElementById('factorialResult').textContent = error ? error : `${n}! = ${result}`;
    
    if (!error) {
      document.getElementById('factorialExplanationText').textContent = 
        `${n}! = ${steps} = ${result}`;
      document.getElementById('factorialExplanation').classList.remove('hidden');
    }
  });
}


// Prime Checker //
const primeForm = document.getElementById('primeForm');
if (primeForm) {
  primeForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const num = parseInt(document.getElementById('primeInput').value);
    let result = '';
    let explanation = '';

    if (isNaN(num) || num < 2) {
      result = 'Please enter an integer greater than 1.';
    } else {
      let isPrime = true;
      let divisors = [];

      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
          isPrime = false;
          divisors.push(i);
          break;
        }
      }

      if (isPrime) {
        result = 'Prime ✓';
        explanation = `${num} is only divisible by 1 and ${num}.`;
      } else {
        result = 'Not Prime ✗';
        explanation = `${num} is divisible by ${divisors[0]} (and other numbers).`;
      }
    }

    document.getElementById('primeResult').textContent = result;
    
    if (explanation) {
      document.getElementById('primeExplanationText').textContent = explanation;
      document.getElementById('primeExplanation').classList.remove('hidden');
    }
  });
}


//  Arithmetic Calculator //
const arithmeticForm = document.getElementById('arithmeticForm');
if (arithmeticForm) {
  arithmeticForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const num1 = parseFloat(document.getElementById('arithNum1').value);
    const num2 = parseFloat(document.getElementById('arithNum2').value);
    const op = document.getElementById('arithOp').value;
    let result = '';
    let expression = '';

    if (isNaN(num1) || isNaN(num2)) {
      result = 'Please enter both numbers.';
    } else {
      switch(op) {
        case '+':
          result = num1 + num2;
          expression = `${num1} + ${num2} = ${result}`;
          break;
        case '-':
          result = num1 - num2;
          expression = `${num1} − ${num2} = ${result}`;
          break;
        case '*':
          result = num1 * num2;
          expression = `${num1} × ${num2} = ${result}`;
          break;
        case '/':
          if (num2 === 0) {
            result = "Cannot divide by zero.";
          } else {
            result = (num1 / num2).toFixed(4);
            expression = `${num1} ÷ ${num2} = ${result}`;
          }
          break;
        default:
          result = "Unknown operation.";
      }
    }

    document.getElementById('arithmeticResult').textContent = isNaN(result) ? result : `Result: ${result}`;
    
    if (expression) {
      document.getElementById('arithmeticExplanationText').textContent = expression;
      document.getElementById('arithmeticExplanation').classList.remove('hidden');
    }
  });
}


//  LCM Calculator  //
const lcmForm = document.getElementById('lcmForm');
if (lcmForm) {
  lcmForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const a = parseInt(document.getElementById('lcmNum1').value);
    const b = parseInt(document.getElementById('lcmNum2').value);
    let error = "";
    let result = '';
    let explanation = '';

    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
      error = "Please enter positive integers.";
    } else {
      // Helper function to find GCD
      function gcd(x, y) {
        while (y) {
          let temp = y;
          y = x % y;
          x = temp;
        }
        return x;
      }

      // LCM formula: (a * b) / gcd(a, b)
      const gcdValue = gcd(a, b);
      result = (a * b) / gcdValue;
      explanation = `LCM(${a}, ${b}) = (${a} × ${b}) / GCD(${a}, ${b}) = (${a * b}) / ${gcdValue} = ${result}`;
    }

    document.getElementById('lcmResult').textContent = error ? error : `LCM = ${result}`;
    
    if (!error) {
      document.getElementById('lcmExplanationText').textContent = explanation;
      document.getElementById('lcmExplanation').classList.remove('hidden');
    }
  });
}


//  GCD Calculator //
const gcdForm = document.getElementById('gcdForm');
if (gcdForm) {
  gcdForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const a = parseInt(document.getElementById('gcdNum1').value);
    const b = parseInt(document.getElementById('gcdNum2').value);
    let error = "";
    let result = '';
    let explanation = '';

    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
      error = "Please enter positive integers.";
    } else {
      // Euclidean Algorithm for GCD
      let x = a, y = b;
      let steps = [];

      while (y !== 0) {
        let remainder = x % y;
        steps.push(`${x} = ${y} × ${Math.floor(x / y)} + ${remainder}`);
        x = y;
        y = remainder;
      }

      result = x;
      explanation = `Using Euclidean Algorithm: GCD(${a}, ${b}) = ${result}`;
    }

    document.getElementById('gcdResult').textContent = error ? error : `GCD = ${result}`;
    
    if (!error) {
      document.getElementById('gcdExplanationText').textContent = explanation;
      document.getElementById('gcdExplanation').classList.remove('hidden');
    }
  });
}


//  Exponent Calculator (a^b)  //
const expForm = document.getElementById('expForm');
if (expForm) {
  expForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const base = parseFloat(document.getElementById('expBase').value);
    const power = parseFloat(document.getElementById('expPower').value);
    let error = "";
    let result = '';
    let explanation = '';

    if (isNaN(base) || isNaN(power)) {
      error = "Please enter valid numbers.";
    } else if (power < 0) {
      error = "Exponent should be non-negative.";
    } else {
      result = Math.pow(base, power);
      
      // Create explanation
      let multiplicationSteps = [];
      if (power === 0) {
        explanation = `Any number to the power 0 is 1. ${base}^0 = 1`;
      } else if (power === 1) {
        explanation = `${base}^1 = ${base}`;
      } else {
        let steps = Array(Math.floor(power)).fill(base).join(' × ');
        explanation = `${base}^${power} = ${steps} = ${result}`;
      }
    }

    document.getElementById('expResult').textContent = error ? error : `${base}^${power} = ${result}`;
    
    if (!error) {
      document.getElementById('expExplanationText').textContent = explanation;
      document.getElementById('expExplanation').classList.remove('hidden');
    }
  });
}


//  Square & Square Root Calculator  //
const sqrtForm = document.getElementById('sqrtForm');
if (sqrtForm) {
  sqrtForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const num = parseFloat(document.getElementById('sqrtInput').value);
    let error = "";
    let square = '';
    let sqRoot = '';
    let explanation = '';

    if (isNaN(num)) {
      error = "Please enter a valid number.";
    } else {
      // Square calculation
      square = num * num;
      
      // Square root calculation (only for positive numbers)
      if (num >= 0) {
        sqRoot = Math.sqrt(num).toFixed(4);
        explanation = `${num}² = ${num} × ${num} = ${square}<br/>√${num} = ${sqRoot}`;
      } else {
        sqRoot = "Cannot find square root of negative number";
        explanation = `${num}² = ${num} × ${num} = ${square}<br/>Note: Cannot find square root of negative numbers in real numbers.`;
      }
    }

    if (error) {
      document.getElementById('sqrtResult').textContent = error;
      document.getElementById('sqrtExplanation').classList.add('hidden');
    } else {
      document.getElementById('sqrtResult').innerHTML = `<div>${num}² = <strong>${square}</strong></div><div class="mt-2">√${num} = <strong>${sqRoot}</strong></div>`;
      document.getElementById('sqrtExplanationText').innerHTML = explanation;
      document.getElementById('sqrtExplanation').classList.remove('hidden');
    }
  });
}

