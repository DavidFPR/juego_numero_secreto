let intentos = 1;
var intentosMaximos = 3;
let numeroMaximo = 10;
let numeroSecreto = generarNumeroSecreto();

// Agregar un evento al input para detectar cuando se presiona una tecla.
document
  .getElementById('valorUsuario')
  .addEventListener('keyup', function (event) {
    // Comprobar si la tecla presionada es Enter.
    if (event.key === 'Enter') {
      // Prevenir el comportamiento por defecto del Enter
      event.preventDefault();
      // Hacer clic en el botón intentar.
      document.getElementById('botonIntentar').click();
    }
  });

// Función para cambiar texto a elementos HTML
function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

// Función para cambiar la imagen del robot dependiendo del estado del juego.
function actualizarImagen(estado) {
  const robotImage = document.querySelector('.container__imagen-persona');
  switch (estado) {
    case 'nuevo':
      robotImage.src = './img/robot_inicial.svg';
      break;
    case 'jugando':
      robotImage.src = './img/robot_jugando.svg';
      break;
    case 'ganado':
      robotImage.src = './img/robot_ganado.svg';
      break;
    case 'perdido':
      robotImage.src = './img/robot_perdido.svg';
      break;
  }
}

// Función que verifica si el usuario ingresó el número secreto, y reglas dependiendo si acertó o no.
function verificarIntento() {
  let numeroDeUsuario = document.getElementById('valorUsuario').value;

  if (numeroDeUsuario === '') {
    asignarTextoElemento('p', 'Por favor, ingresa un número.');
    return;
  }

  numeroDeUsuario = parseInt(numeroDeUsuario);

  if (numeroDeUsuario === numeroSecreto && intentos <= intentosMaximos) {
    asignarTextoElemento(
      'p',
      `Acertaste el número en <span class="intentos__maximos">${intentos}</span> ${
        intentos === 1 ? 'intento.' : 'intentos.'
      }`
    );
    actualizarImagen('ganado');
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    //El usuario no acertó, pero le quedan intentos.
    if (numeroDeUsuario > numeroSecreto) {
      asignarTextoElemento(
        'p',
        `El número secreto es <span class="intentos__maximos">menor</span>. Te quedan <span class="intentos__maximos">${
          intentosMaximos - intentos
        }</span> intentos.`
      );
    } else {
      asignarTextoElemento(
        'p',
        `El número secreto es <span class="intentos__maximos">mayor</span>. Te quedan <span class="intentos__maximos">${
          intentosMaximos - intentos
        }</span> intentos.`
      );
    }
    actualizarImagen('jugando');
    intentos++;

    // El usuario alcanzó el límite máximo de intentos.
    if (intentos > intentosMaximos) {
      asignarTextoElemento(
        'p',
        `Lo siento, no has acertado. El número secreto era <span class="intentos__maximos">${numeroSecreto}</span>.`
      );
      actualizarImagen('perdido');
      document.getElementById('reiniciar').removeAttribute('disabled');
      document.getElementById('botonIntentar').setAttribute('disabled', 'true');
      document.getElementById('reiniciar').focus(); // Cambiar foco al botón de reiniciar
    }

    limpiarCaja();
  }
  return;
}

// Función que limpia la caja de input.
function limpiarCaja() {
  document.querySelector('#valorUsuario').value = '';
}

// Función que genera un número pseudo-aleatorio entre 1 y la variable numeroMaximo.
function generarNumeroSecreto() {
  return Math.floor(Math.random() * numeroMaximo) + 1;
}

// Función que indica las condiciones iniciales del juego, o al reiniciarlo.
function condicionesIniciales() {
  asignarTextoElemento('h1', 'Juego del número secreto!');
  asignarTextoElemento(
    'p',
    `Indica un número del <span class="intentos__maximos">1</span> al <span class="intentos__maximos">${numeroMaximo}</span>. TIenes <span class="intentos__maximos">${intentosMaximos}</span> ${intentosMaximos === 1 ? 'intento' : 'intentos'}.`
  );
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
  intentosMaximos = intentosMaximos;
  console.log(numeroSecreto);
  actualizarImagen('nuevo');
}

// Función que indica qué sucede cuando se usa el botón reiniciar.
function reiniciarJuego() {
  limpiarCaja();
  condicionesIniciales();
  document.querySelector('#reiniciar').setAttribute('disabled', 'true');
  document.getElementById('botonIntentar').removeAttribute('disabled');
}

condicionesIniciales();
