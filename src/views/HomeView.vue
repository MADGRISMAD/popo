<script setup lang="ts">
import { reactive, onMounted } from 'vue';

// Variables de estado para el parque
const parkState = reactive({
  dogs: [] as { id: number; x: number; y: number }[],
  poop: [] as { id: number; x: number; y: number }[],
  poopCollected: 0,
});

// Identificadores únicos para perritos y popós
let dogId = 0;
let poopId = 0;

// Generar posiciones aleatorias para los perritos y la popó dentro del contenedor
const generateRandomPosition = (width: number, height: number) => {
  const x = Math.random() * (width - 100); // Posición horizontal aleatoria
  const y = Math.random() * (height - 100); // Posición vertical aleatoria
  return { x, y };
};

// Añadir perritos al parque
const addDog = (width: number, height: number) => {
  const { x, y } = generateRandomPosition(width, height);
  parkState.dogs.push({ id: dogId++, x, y });
};

// Añadir popó al parque
const addPoop = (dogX: number, dogY: number) => {
  const newPoop = { id: poopId++, x: dogX + Math.random() * 50 - 25, y: dogY + Math.random() * 50 - 25 };
  parkState.poop.push(newPoop);

  // Remover popó después de cierto tiempo
  setTimeout(() => {
    parkState.poop = parkState.poop.filter(poop => poop.id !== newPoop.id);
  }, 5000);
};

// Hacer que los perritos paseen y dejen popó
const moveDogs = (width: number, height: number) => {
  parkState.dogs.forEach(dog => {
    dog.x += Math.random() * 40 - 20; // Movimiento horizontal aleatorio
    dog.y += Math.random() * 40 - 20; // Movimiento vertical aleatorio

    // Asegurar que los perros no salgan del parque
    dog.x = Math.max(50, Math.min(width - 150, dog.x));
    dog.y = Math.max(50, Math.min(height - 150, dog.y));

    // Dejar popó ocasionalmente
    if (Math.random() < 0.2) {
      addPoop(dog.x, dog.y);
    }
  });
};

// Incrementar el contador al recoger popó
const collectPoop = (poopId: number) => {
  parkState.poopCollected++;
  parkState.poop = parkState.poop.filter(poop => poop.id !== poopId);
};

// Inicializar perritos y movimiento
onMounted(() => {
  const parkWidth = window.innerWidth - 320 * 2; // Espacio restante entre los sidebars
  const parkHeight = window.innerHeight;

  // Añadir algunos perritos iniciales
  for (let i = 0; i < 5; i++) {
    addDog(parkWidth, parkHeight);
  }

  // Mover a los perritos periódicamente
  setInterval(() => {
    moveDogs(parkWidth, parkHeight);
  }, 1000);
});
</script>

<template>
  <div class="relative bg-green-200 h-full rounded-lg shadow-lg overflow-hidden">
    <h1 class="text-2xl font-bold text-center mb-6">Vista del Parque</h1>

    <!-- Valla -->
    <div class="absolute inset-0 border-t-8 border-l-8 border-r-8 border-white border-dashed"></div>

    <!-- Pasto -->
    <div class="absolute inset-0 bg-gradient-to-b from-green-300 to-green-500"></div>

    <!-- Perritos -->
    <div
      v-for="dog in parkState.dogs"
      :key="dog.id"
      class="absolute w-16 h-16"
      :style="{ left: dog.x + 'px', top: dog.y + 'px' }"
    >
      <img
        src="../assets/dog.png"
        alt="Perro paseando"
        class="w-full h-full object-contain"
      />
    </div>

    <!-- Popó -->
    <div
      v-for="poop in parkState.poop"
      :key="poop.id"
      class="absolute text-4xl cursor-pointer"
      :style="{ left: poop.x + 'px', top: poop.y + 'px' }"
      @click="collectPoop(poop.id)"
    >
      💩
    </div>

    <!-- Contador de popó -->
    <div class="absolute top-0 right-0 bg-yellow-400 text-white font-bold p-2 rounded-bl-lg">
      Popós Limpias: {{ parkState.poopCollected }}
    </div>
  </div>
</template>

<style scoped>
/* Animación para el movimiento de los perros */
@keyframes dog-move {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
}

img {
  animation: dog-move 1s ease-in-out infinite;
}
</style>
