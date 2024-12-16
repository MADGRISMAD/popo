<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

// Ruta del archivo de sonido
const poopSoundSrc = new URL('../assets/caca.mp3', import.meta.url).href;

// Variables de estado
const state = reactive({
  poopCollected: 0,
  backgroundPoops: [] as { id: number; x: number; angle: number }[],
  clickCounters: [] as { id: number; x: number; y: number }[],
  clicks: 0,
  cps: 0,
});

// Identificadores únicos para popós y contadores
let poopId = 0;
let counterId = 0;

// Funciones auxiliares
const generateRandomPosition = () => {
  const x = Math.random() * (window.innerWidth - 50); // Posición horizontal ajustada
  const y = Math.random() * -100; // Comienza fuera de la pantalla (por encima)
  const angle = Math.random() * 360; // Ángulo aleatorio para rotar la popó
  return { x, y, angle };
};

const addBackgroundPoop = () => {
  for (let i = 0; i < 10; i++) {
    const { x, y, angle } = generateRandomPosition();
    const newPoop = { id: poopId++, x, y, angle };
    state.backgroundPoops.push(newPoop);

    // Eliminar popó después de unos segundos
    setTimeout(() => {
      state.backgroundPoops = state.backgroundPoops.filter(poop => poop.id !== newPoop.id);
    }, 6000); // Las popós desaparecen después de 6 segundos
  }
};

const handleCollectPoop = (event: MouseEvent) => {
  state.poopCollected++;
  state.clicks++;
  addBackgroundPoop();

  // Reproducir sonido
  const poopSound = new Audio(poopSoundSrc);
  poopSound.play().catch(error => console.error('Error al reproducir el sonido:', error));

  // Mostrar contador de clics en la posición del clic
  const { clientX: x, clientY: y } = event;
  const newCounter = { id: counterId++, x, y };
  state.clickCounters.push(newCounter);

  // Eliminar contador después de 1 segundo
  setTimeout(() => {
    state.clickCounters = state.clickCounters.filter(counter => counter.id !== newCounter.id);
  }, 1000);
};

// Calcular clicks por segundo (CPS)
onMounted(() => {
  setInterval(() => {
    state.cps = state.clicks;
    state.clicks = 0;
  }, 1000);

  // Generar lluvia intensa de popós en el fondo continuamente
  setInterval(() => {
    addBackgroundPoop();
  }, 200);
});
</script>

<template>
  <div class="relative h-screen w-full bg-gradient-to-b from-teal-400 to-blue-200 overflow-hidden select-none">
    <!-- Fondo de Popós -->
    <div class="absolute inset-0 z-0">
      <div
        v-for="poop in state.backgroundPoops"
        :key="poop.id"
        class="absolute text-[6rem] opacity-70 animate-fall-and-rotate"
        :style="{
          left: poop.x + 'px',
          top: poop.y + 'px',
          transform: 'rotate(' + poop.angle + 'deg)'
        }"
      >
        💩
      </div>
    </div>

    <!-- Contadores de Click -->
    <div
      v-for="counter in state.clickCounters"
      :key="counter.id"
      class="absolute text-2xl font-bold text-yellow-500 opacity-100 animate-bounce z-50"
      :style="{
        left: counter.x + 'px',
        top: counter.y + 'px'
      }"
    >
      +1 💩
    </div>

    <!-- Contenido Interactivo -->
    <div class="relative z-10">
      <!-- Encabezado -->
      <div class="absolute top-0 w-full py-4 bg-yellow-400 text-white text-center shadow-lg">
        <h1 class="text-4xl font-extrabold tracking-wider">🐾 Guardería de Perros Felices 🐾</h1>
        <p class="text-lg mt-2">Popós Limpias: <span class="font-bold">{{ state.poopCollected }}</span></p>
        <p class="text-lg mt-2">Clicks por segundo (CPS): <span class="font-bold">{{ state.cps }}</span></p>
      </div>

      <!-- Imagen del Perro -->
      <div class="flex flex-col items-center justify-center h-screen">
        <!-- Auras Giratorias -->
        <div
          class="absolute w-64 h-64 border-t-4 border-yellow-400 rounded-full animate-spin-clockwise"
          style="clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);"
        ></div>
        <div
          class="absolute w-48 h-48 border-t-4 border-yellow-600 rounded-full animate-spin-counterclockwise"
          style="clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);"
        ></div>

        <!-- Perro como Botón -->
        <div
          class="relative w-48 h-48 bg-white rounded-full shadow-xl border-4 border-yellow-500 flex items-center justify-center cursor-pointer transform hover:scale-110 transition-transform duration-300"
          @click="handleCollectPoop"
          draggable="false"
        >
          <img
            src="../assets/dog.png"
            alt="Perro Corgi"
            class="w-44 h-44 object-contain select-none"
            draggable="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animación de caída y rotación de las popós */
@keyframes fall-and-rotate {
  0% {
    transform: translateY(-100%) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

.animate-fall-and-rotate {
  animation: fall-and-rotate 6s linear infinite;
  pointer-events: none; /* Las popós en el fondo no interfieren con clics */
}

/* Animación de rebote para contadores */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(-20px);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.animate-bounce {
  animation: bounce 1s ease-out forwards;
}

/* Animaciones de las auras */
@keyframes spin-clockwise {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin-counterclockwise {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

.animate-spin-clockwise {
  animation: spin-clockwise 8s linear infinite;
}

.animate-spin-counterclockwise {
  animation: spin-counterclockwise 12s linear infinite;
}
</style>
