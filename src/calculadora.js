class Calculadora {
  sumar(a, b) {
    return a + b;
  }

  restar(a, b) {
    return a - b;
  }

  multiplicar(a, b) {
    return a * b;
  }

  dividir(a, b) {
        if (b === 0){
        throw new Error("No se puede dividir por cero");
        }
        return a/b;
  }

  potencia(base, exponente) {
    return base ** exponente;
  }

  raizCuadrada(numero) {
    if (numero>0){ return Math.sqrt(numero);} 
    else{return "No se puede calcular la raíz cuadrada de un número negativo";};
  }

  factorial(numero){
    if (numero < 0) {
      return "No se puede calcular el factorial de un número negativo";
    }
    if (numero === 0 || numero === 1) {
      return 1;
    }
    let resultado = 1;
    for (let i = 2; i <= numero; i++) {
      resultado *= i;
    }
    return resultado;
  }
  promedio(arr) {
          if (!Array.isArray(arr) || arr.length === 0) {
              return "Error: El array está vacío o no es un array válido.";
          }

          const suma = arr.reduce((acc, current) => acc + current, 0);
          return suma / arr.length;
    }

    maximo(arr) {
            if (!Array.isArray(arr) || arr.length === 0) {
                return "Error: El array está vacío o no es un array válido.";
            }
            // Usa Math.max con el operador spread para encontrar el máximo del array
            return Math.max(...arr);
    }


    resto(a,b){
      if (b === 0){
      return ("No se puede calcular el resto con divisor cero");
      }
      return a % b;
    }
}


// Exportar para usar en tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Calculadora;
}

// Para usar en consola de Node.js
const calc = new Calculadora();

console.log('=== Calculadora Simple ===');
console.log('Ejemplo de uso:');
console.log('calc.sumar(5, 3):', calc.sumar(5, 3));
console.log('\nFunciones disponibles:');
console.log('- calc.sumar(a, b)');
console.log('- calc.restar(a, b)');
console.log('- calc.multiplicar(a, b)');
console.log('- calc.dividir(a, b)');
console.log('- calc.potencia(base, exponente)');
console.log('- calc.raizCuadrada(numero)');