<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Importar el archivo de audio
const poopSound = new Audio(new URL('../assets/caca.mp3', import.meta.url).href);


const poopCollected = ref(0);
const backgroundPoops = ref<{ id: number; x: number; angle: number }[]>([]);

let poopId = 0;

const generateRandomPosition = () => {
  const x = Math.random() * window.innerWidth; // Posición horizontal aleatoria
  const y = Math.random() * -100; // Comienza fuera de la pantalla (por encima)
  const angle = Math.random() * 360; // Ángulo aleatorio para rotar la popó
  return { x, y, angle };
};

const addBackgroundPoop = () => {
  // Generar múltiples popós en cada llamada
  for (let i = 0; i < 10; i++) {
    const { x, y, angle } = generateRandomPosition();
    const newPoop = { id: poopId++, x, y, angle };
    backgroundPoops.value.push(newPoop);

    // Eliminar popó después de unos segundos
    setTimeout(() => {
      backgroundPoops.value = backgroundPoops.value.filter(poop => poop.id !== newPoop.id);
    }, 6000); // Las popós desaparecen después de 6 segundos
  }
};

const handleCollectPoop = () => {
  poopCollected.value += 1;
  addBackgroundPoop(); // Añade más popós al fondo

  // Reproducir el sonido de la popó
  poopSound.currentTime = 0; // Reinicia el audio para que pueda reproducirse cada vez
  poopSound.play();
};

onMounted(() => {
  // Generar lluvia intensa de popós en el fondo continuamente
  setInterval(() => {
    addBackgroundPoop();
  }, 200); // Generar popós cada 200ms para aumentar la densidad
});
</script>

<template>
  <div class="relative h-screen w-full bg-gradient-to-b from-indigo-500 to-green-400 overflow-hidden">
    <!-- Fondo de Popós -->
    <div class="absolute inset-0 z-0">
      <div
        v-for="poop in backgroundPoops"
        :key="poop.id"
        class="absolute text-[8rem] opacity-30 animate-fall"
        :style="{
          left: poop.x + 'px',
          top: poop.y + 'px',
          transform: 'rotate(' + poop.angle + 'deg)'
        }"
      >
        💩
      </div>
    </div>

    <!-- Contenido Interactivo -->
    <div class="relative z-10">
      <!-- Encabezado -->
      <div class="absolute top-0 w-full py-6 bg-gradient-to-r from-indigo-800 to-purple-700 text-white text-center shadow-lg">
        <h1 class="text-4xl font-extrabold tracking-wider">🐾 Parque de Perros Felices 🐾</h1>
        <p class="text-lg mt-2">Popós Limpias: <span class="font-bold">{{ poopCollected }}</span></p>
      </div>

      <!-- Imagen del Perro -->
      <div class="flex flex-col items-center justify-center h-screen">
        <div
          class="w-48 h-48 mb-6 bg-white rounded-full shadow-xl border-4 border-yellow-400 flex items-center justify-center cursor-pointer transform hover:scale-105 transition-transform duration-300"
          @click="handleCollectPoop"
        >
          <img
            src="../assets/dog.png"
            alt="Perro Corgi"
            class="w-44 h-44 object-contain"
          />
        </div>
        <button
          @click="handleCollectPoop"
          class="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-8 py-3 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
        >
          ¡Haz clic para limpiar popó!
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animación de caída de popós */
@keyframes fall {
  0% {
    transform: translateY(-100%);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}

.animate-fall {
  animation: fall 6s linear infinite;
}
</style>
