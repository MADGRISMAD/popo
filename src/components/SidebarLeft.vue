<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

// Ruta del archivo de sonido
const poopSoundSrc = new URL('../assets/caca.mp3', import.meta.url).href;

// Configuración de CPS
const MAX_CPS_FOR_BOUNCE = 5; // Umbral de CPS para rebote continuo

// Variables de estado
const state = reactive({
  poopCollected: 0,
  backgroundPoops: [] as { id: number; x: number; y: number; angle: number }[],
  clickCounters: [] as { id: number; x: number; y: number }[],
  clicks: 0,
  cps: 0,
});

// Identificadores únicos para popós y contadores
let poopId = 0;
let counterId = 0;

// Estados de animación del perro
const isBouncing = ref(false);
const isContinuousBounce = ref(false);

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

  // Eliminar contador después de 0.6 segundos
  setTimeout(() => {
    state.clickCounters = state.clickCounters.filter(counter => counter.id !== newCounter.id);
  }, 600);

  // Animar el rebote del perro
  if (state.cps <= MAX_CPS_FOR_BOUNCE) {
    isContinuousBounce.value = false;
    isBouncing.value = true;
    setTimeout(() => {
      isBouncing.value = false;
    }, 300); // Rebote individual dura 300ms
  } else {
    isContinuousBounce.value = true; // Habilitar rebote continuo si CPS es alto
  }
};

// Calcular clicks por segundo (CPS)
onMounted(() => {
  setInterval(() => {
    state.cps = state.clicks;
    state.clicks = 0;

    // Si CPS cae por debajo del umbral, deshabilitar rebote continuo
    if (state.cps <= MAX_CPS_FOR_BOUNCE) {
      isContinuousBounce.value = false;
    }
  }, 1000);

  // Generar lluvia intensa de popós en el fondo continuamente
  setInterval(() => {
    addBackgroundPoop();
  }, 200);
});
</script>

<template>
  <div class="relative h-screen w-full bg-gradient-to-b from-green-300 to-yellow-200 overflow-hidden select-none">
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
      class="absolute text-2xl font-bold text-yellow-500 opacity-100 animate-bounce-short z-50 pointer-events-none"
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
      <div class="absolute top-0 w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center shadow-lg rounded-b-lg">
  <!-- Título Principal -->
  <h1 class="text-2xl font-extrabold tracking-wide uppercase leading-tight px-4 truncate">
    🐾 Guardería 🐾
  </h1>

  <!-- Estadísticas -->
  <div class="flex justify-center space-x-8 mt-2">
    <div class="text-sm">
      <p class="font-semibold">Popós Limpias</p>
      <p class="text-xl font-bold">{{ state.poopCollected }}</p>
    </div>
    <div class="text-sm">
      <p class="font-semibold">Clicks por Segundo</p>
      <p class="text-xl font-bold">{{ state.cps }}</p>
    </div>
  </div>
</div>


      <!-- Imagen del Perro -->
      <div class="flex flex-col items-center justify-center h-screen">
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
            :class="{
              'animate-dog-bounce': isBouncing,
              'animate-dog-continuous-bounce': isContinuousBounce,
            }"
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

/* Animación de rebote individual */
@keyframes dog-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-dog-bounce {
  animation: dog-bounce 0.3s ease-in-out;
}

/* Animación de rebote continuo */
@keyframes dog-continuous-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-dog-continuous-bounce {
  animation: dog-continuous-bounce 0.6s ease-in-out infinite;
}

/* Animación de rebote para los contadores con duración reducida */
@keyframes bounce-short {
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

.animate-bounce-short {
  animation: bounce-short 0.6s ease-out forwards;
  pointer-events: none;
}
</style>
