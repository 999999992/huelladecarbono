// === MODO OSCURO ===
document.getElementById('toggle-theme').addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');

  const ranges = document.querySelectorAll('input[type="range"]');
  ranges.forEach(range => {
    range.classList.toggle('range-dark', document.documentElement.classList.contains('dark'));
  });
});

// === Mostrar valor inicial del slider de renovables ===
const renovablesInput = document.getElementById('renovablesPorcentaje');
const renovablesValor = document.getElementById('renovablesValor');
renovablesValor.textContent = `${renovablesInput.value}%`;
renovablesInput.addEventListener('input', () => {
  renovablesValor.textContent = `${renovablesInput.value}%`;
});

// === Función para mostrar errores en pantalla ===
function mostrarError(mensaje) {
  const errorDiv = document.getElementById('errores');
  errorDiv.textContent = mensaje;
  errorDiv.classList.remove('hidden');
  errorDiv.scrollIntoView({ behavior: "smooth" });
}

// === Funciones para calcular puntajes ===
function calcularPuntajeDieta(carne) {
  if (carne > 40) return 20;
  if (carne > 20) return 10;
  return 5;
}

function calcularPuntajeVuelos(vuelos) {
  if (vuelos > 20) return 20;
  if (vuelos > 10) return 10;
  return 5;
}

function calcularPuntajeAuto(autoKm) {
  if (autoKm > 100) return 20;
  if (autoKm > 50) return 10;
  return 5;
}

function calcularPuntajeEnergia(renovables) {
  if (renovables >= 80) return -10;
  if (renovables >= 50) return -5;
  return 0;
}

function calcularPuntajeResiduos(reciclaje, compostaje) {
  let puntaje = 0;
  if (reciclaje >= 50) puntaje -= 5;
  if (compostaje >= 30) puntaje -= 5;
  return puntaje;
}

function calcularPuntajeAdicionales(valores) {
  let puntaje = 0;

  const positivas = [
    11, 12, 13, 15, 16, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 30
  ];
  const negativas = [
    10, 14, 17, 20, 29
  ];

  valores.forEach((valor, index) => {
    const numPregunta = index + 10;

    if (positivas.includes(numPregunta)) {
      if (valor >= 80) puntaje -= 2;
      else if (valor >= 50) puntaje -= 1;
    } else if (negativas.includes(numPregunta)) {
      if (valor >= 80) puntaje += 2;
      else if (valor >= 50) puntaje += 1;
    }
  });

  return puntaje;
}

// === Navegación entre secciones ===
function mostrarSeccion(idSeccion) {
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.toggle('hidden', sec.id !== idSeccion);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('button[data-next]').forEach(button => {
  button.addEventListener('click', () => {
    const nextSectionId = button.getAttribute('data-next');
    mostrarSeccion(nextSectionId);
  });
});

document.querySelectorAll('button[data-prev]').forEach(button => {
  button.addEventListener('click', () => {
    const prevSectionId = button.getAttribute('data-prev');
    mostrarSeccion(prevSectionId);
  });
});

// === Manejo de botones Sí / No ===
document.querySelectorAll('.respuesta-btn').forEach(button => {
  button.addEventListener('click', () => {
    const id = button.dataset.id;
    const value = parseFloat(button.dataset.value);

    // Marcar como seleccionado visualmente
    document.querySelectorAll(`.respuesta-btn[data-id="${id}"]`).forEach(btn => {
      btn.classList.remove('bg-green-600', 'text-white', 'ring', 'ring-offset-2');
    });
    button.classList.add('bg-green-600', 'text-white', 'ring', 'ring-offset-2');

    // Crear o actualizar el input oculto con el valor
    let input = document.getElementById(id);
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.id = id;
      input.name = id;
      document.getElementById('carbon-form').appendChild(input);
    }
    input.value = value;
  });
});


// === Manejo del formulario ===
document.getElementById('carbon-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const errorDiv = document.getElementById('errores');
  const resultadoDiv = document.getElementById('resultado');
  errorDiv.classList.add('hidden');
  resultadoDiv.classList.add('hidden');
  resultadoDiv.innerHTML = '';

  // === Dieta (1-3) ===
  const carne = parseFloat(document.getElementById('carne').value);
  const lacteos = parseFloat(document.getElementById('lacteos').value);
  const vegetales = parseFloat(document.getElementById('vegetales').value);

  if ([carne, lacteos, vegetales].some(v => isNaN(v))) {
    return mostrarError("⚠️ Todos los campos de la dieta deben estar completos.");
  }
  if (carne < 0 || lacteos < 0 || vegetales < 0) {
    return mostrarError("⚠️ Los valores de la dieta no pueden ser negativos.");
  }
  if (carne + lacteos + vegetales > 100) {
    return mostrarError("⚠️ La suma de los porcentajes de tu dieta no puede superar el 100%.");
  }

  // === Residuos (4-6) ===
  const reciclaje = parseFloat(document.getElementById('reciclaje').value);
  const compostaje = parseFloat(document.getElementById('compostaje').value);
  const vertedero = parseFloat(document.getElementById('vertedero').value);

  if ([reciclaje, compostaje, vertedero].some(v => isNaN(v))) {
    return mostrarError("⚠️ Todos los campos de residuos deben estar completos.");
  }
  if (reciclaje < 0 || compostaje < 0 || vertedero < 0) {
    return mostrarError("⚠️ Los valores de residuos no pueden ser negativos.");
  }
  if (reciclaje + compostaje + vertedero > 100) {
    return mostrarError("⚠️ La suma de los residuos no puede superar el 100%.");
  }

  // === Transporte (7-8) ===
  const vuelos = parseFloat(document.getElementById('vuelosHoras').value);
  const autoKm = parseFloat(document.getElementById('autoKm').value);

  if ([vuelos, autoKm].some(v => isNaN(v))) {
    return mostrarError("⚠️ Completa todos los campos numéricos de transporte.");
  }
  if (vuelos < 0 || autoKm < 0) {
    return mostrarError("⚠️ Los valores de transporte no pueden ser negativos.");
  }

  // === Energía renovable (9) ===
  const energiaRenov = parseFloat(renovablesInput.value);
  if (isNaN(energiaRenov) || energiaRenov < 0) {
    return mostrarError("⚠️ Completa el campo de energía renovable correctamente.");
  }

  // === Preguntas adicionales (10-30) ===
  const adicionalesIds = [
    'pregunta10','pregunta11','pregunta12','pregunta13','pregunta14','pregunta15',
    'pregunta16','pregunta17','pregunta18','pregunta19','pregunta20','pregunta21',
    'pregunta22','pregunta23','pregunta24','pregunta25','pregunta26','pregunta27',
    'pregunta28','pregunta29',
    ];

  const adicionalesValores = [];
  for (let id of adicionalesIds) {
    const val = parseFloat(document.getElementById(id)?.value);
    if (val === undefined || isNaN(val)) {
      return mostrarError(`⚠️ Completa el campo de la pregunta ${id}.`);
    }
    if (val < 0 || val > 100) {
      return mostrarError(`⚠️ Los valores de la pregunta ${id} deben estar entre 0 y 100.`);
    }
    adicionalesValores.push(val);
  }

  // === Cálculo total ===
  const puntajeDieta = calcularPuntajeDieta(carne);
  const puntajeVuelos = calcularPuntajeVuelos(vuelos);
  const puntajeAuto = calcularPuntajeAuto(autoKm);
  const puntajeEnergia = calcularPuntajeEnergia(energiaRenov);
  const puntajeResiduos = calcularPuntajeResiduos(reciclaje, compostaje);
  const puntajeAdicionales = calcularPuntajeAdicionales(adicionalesValores);

  const puntaje = puntajeDieta + puntajeVuelos + puntajeAuto + puntajeEnergia + puntajeResiduos + puntajeAdicionales;

  // === Mensaje final ===
  let mensaje = "";
  if (puntaje >= 30) {
    mensaje = "🌍 Tu huella de carbono es ALTA. Sería útil revisar tus hábitos.";
  } else if (puntaje >= 10) {
    mensaje = "⚖️ Tu huella de carbono es MEDIA. Vas por buen camino, pero podés mejorar.";
  } else {
    mensaje = "✅ ¡Excelente! Tu huella de carbono es BAJA. Seguí así.";
  }

  resultadoDiv.innerHTML = `
    <p class="text-lg font-semibold">${mensaje}</p>
    <p class="mt-2 text-sm">Puntaje total estimado: <strong>${puntaje}</strong></p>
    <ul class="mt-2 text-sm list-disc list-inside">
      <li><strong>Alimentación:</strong> ${puntajeDieta} puntos</li>
      <li><strong>Vuelos:</strong> ${puntajeVuelos} puntos</li>
      <li><strong>Uso del auto:</strong> ${puntajeAuto} puntos</li>
      <li><strong>Energía renovable:</strong> ${puntajeEnergia} puntos</li>
      <li><strong>Gestión de residuos:</strong> ${puntajeResiduos} puntos</li>
      <li><strong>Hábitos adicionales:</strong> ${puntajeAdicionales} puntos</li>
    </ul>
  `;

  resultadoDiv.classList.remove('hidden');
  resultadoDiv.scrollIntoView({ behavior: "smooth" });
});
