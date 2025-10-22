const readline = require('readline');
const Calculadora = require('./calculadora');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const calc = new Calculadora();

function mostrarMenu() {
  console.log('\n=================================');
  console.log('     CALCULADORA INTERACTIVA     ');
  console.log('=================================');
  console.log('1. Sumar');
  console.log('2. Restar');
  console.log('3. Multiplicar');
  console.log('4. Dividir');
  console.log('5. Potencia');
  console.log('6. Raíz Cuadrada');
  console.log('7. Factorial');
  console.log('8. Resto')
  console.log('9.  Array Promedio');

  console.log('11. Guardar en memoria');
  console.log('12. Usar memoria');
  console.log('13. Limpiar memoria');
  console.log('0. Salir');
  console.log('=================================');
}

function pedirNumero(mensaje) {
  return new Promise((resolve) => {
    rl.question(mensaje, (respuesta) => {
      const numero = parseFloat(respuesta);
      resolve(numero);
    });
  });
}

async function pedirNumeroConMemoria(mensaje) {
  const memoriaActual = calc.obtenerDeMemoria();

  if (memoriaActual !== null) {
    const usarMemoria = await new Promise((resolve) => {
      rl.question(`¿Usar valor de memoria (${memoriaActual})? (s/n): `, (respuesta) => {
        resolve(respuesta.toLowerCase() === 's');
      });
    });

    if (usarMemoria) {
      return memoriaActual;
    }
  }

  return await pedirNumero(mensaje);
}

async function operacionArrayNumeros(operacion, nombreOperacion) {
  let numeros = [];
  console.log(`\n-- Ingrese números para calcular el ${nombreOperacion}. Escriba 'fin' para terminar. --`);

  while (true) {
    const respuesta = await new Promise((resolve) => {
      rl.question(`Ingrese número ${numeros.length + 1} (o 'fin'): `, resolve);
    });

    if (respuesta.toLowerCase() === 'fin') {
      break;
    }

    const numero = parseFloat(respuesta);

    if (!isNaN(numero)) {
      numeros.push(numero);
    } else {
      console.log('⚠️  Entrada inválida. Intente de nuevo.');
    }
  }

  if (numeros.length === 0) {
    console.log(`\n⚠️  No se ingresaron números para calcular el ${nombreOperacion}.`);
    return;
  }

  const resultado = operacion(numeros);
  const numerosStr = `[${numeros.join(', ')}]`;

  if (resultado === undefined) {
    console.log(`\n⚠️  La función ${nombreOperacion} aún no está implementada en Calculadora.js`);
  } else if (typeof resultado === 'string') {
    console.log(`\n⚠️  Error: ${resultado}`);
  } else {
    console.log(`\n✓ Resultado: ${nombreOperacion} de ${numerosStr} = ${resultado}`);
  }
}

async function operacionDosNumeros(operacion, nombreOperacion) {
  const num1 = await pedirNumeroConMemoria('Ingrese el primer número: ');
  const num2 = await pedirNumeroConMemoria('Ingrese el segundo número: ');

  const resultado = operacion(num1, num2);

  if (resultado === undefined) {
    console.log(`\n⚠️  La función ${nombreOperacion} aún no está implementada`);
  } else if (typeof resultado === 'string' && resultado.includes('Error')) {
    console.log(`\n❌ ${resultado}`);
  } else {
    console.log(`\n✓ Resultado: ${num1} ${getSimboloOperacion(nombreOperacion)} ${num2} = ${resultado}`);

    // Preguntar si guardar en memoria automáticamente
    const guardar = await new Promise((resolve) => {
      rl.question('¿Guardar resultado en memoria? (s/n): ', (respuesta) => {
        resolve(respuesta.toLowerCase() === 's');
      });
    });

    if (guardar) {
      calc.guardarEnMemoria(resultado);
      console.log('💾 Resultado guardado en memoria');
    }
  }
}

async function operacionUnNumero(operacion, nombreOperacion) {
  const num = await pedirNumero('Ingrese el número: ');
  
  const resultado = operacion(num);
  
  if (resultado === undefined) {
    console.log(`\n⚠️  La función ${nombreOperacion} aún no está implementada`);
  } else if (isNaN(resultado)) {
    console.log(`\n⚠️  Error: Operación inválida (resultado: NaN)`);
  } else if (typeof resultado === 'string') {
    console.log(`\n⚠️  Error: ${resultado}`);
  } else {
    console.log(`\n✓ Resultado: √${num} = ${resultado}`);
  }
}

function getSimboloOperacion(nombre) {
  const simbolos = {
    'suma': '+',
    'resta': '-',
    'multiplicación': '×',
    'división': '÷',
    'potencia': '^'
  };
  return simbolos[nombre] || '';
}

async function ejecutarOpcion(opcion) {
  switch(opcion) {
    case '1':
      await operacionDosNumeros(
        (a, b) => calc.sumar(a, b),
        'suma'
      );
      break;
    
    case '2':
      await operacionDosNumeros(
        (a, b) => calc.restar(a, b),
        'resta'
      );
      break;
    
    case '3':
      await operacionDosNumeros(
        (a, b) => calc.multiplicar(a, b),
        'multiplicación'
      );
      break;
    
    case '4':
      await operacionDosNumeros(
        (a, b) => calc.dividir(a, b),
        'división'
      );
      break;
    
    case '5':
      const base = await pedirNumero('Ingrese la base: ');
      const exponente = await pedirNumero('Ingrese el exponente: ');
      const resultadoPot = calc.potencia(base, exponente);
      
      if (resultadoPot === undefined) {
        console.log('\n⚠️  La función potencia aún no está implementada');
      } else {
        console.log(`\n✓ Resultado: ${base}^${exponente} = ${resultadoPot}`);
      }
      break;
    
    case '6':
      await operacionUnNumero(
        (num) => calc.raizCuadrada(num),
        'raíz cuadrada'
      );
      break;
    // declaracion de funcion factorial
    case '7':
      const numeroFact = await pedirNumero('Ingrese el número para calcular su factorial: ');
      const resultadoFact = calc.factorial(numeroFact);
      
      if (resultadoFact === undefined) {
        console.log('\n La función factorial aún no está implementada');
      } else if (typeof resultadoFact === 'string') {
        console.log(`\n Error: ${resultadoFact}`);
      } else {
        console.log(`\n✓ Resultado: ${numeroFact}! = ${resultadoFact}`);
      }
      break;

    //declaracion de funcion resto
    case '8':
    await operacionDosNumeros(
            (a, b) => calc.resto(a, b),
            'resto'
          );
          break;

      case '9':
        await operacionArrayNumeros(
          (arr) => calc.promedio(arr), //
          'Promedio de Array'
        );
        break;

    case '11':
    // Guardar en memoria
        const valor = await pedirNumero('Ingrese el valor a guardar en memoria: ');
        calc.guardarEnMemoria(valor);
        console.log(`💾 Valor ${valor} guardado en memoria`);
        break;

    case '12':
    // Usar memoria
      const memoria = calc.obtenerDeMemoria();
      if (memoria === null) {
        console.log('\n💾 No hay valor guardado en memoria');
      } else {
        console.log(`\n💾 Valor en memoria: ${memoria}`);
      }
      break;

    case '13':
    // Limpiar memoria
       const mensaje = calc.limpiarMemoria();
       console.log(`\n${mensaje}`);
       break;

    case '0':
      console.log('\n¡Hasta luego! 👋');
      rl.close();
      return false;
    
    default:
      console.log('\n⚠️  Opción inválida. Por favor intente nuevamente.');
  }
  
  return true;
}

async function iniciar() {
  let continuar = true;
  
  while (continuar) {
    mostrarMenu();
    
    const opcion = await new Promise((resolve) => {
      rl.question('\nSeleccione una opción: ', resolve);
    });
    
    continuar = await ejecutarOpcion(opcion);
  }
}

// Iniciar el cliente
console.log('Bienvenido a la Calculadora Interactiva');
iniciar();