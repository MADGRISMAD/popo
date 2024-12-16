<template>
  <div
    class="relative bg-green-200 h-full w-full overflow-hidden"
    :style="{ backgroundImage: `url(${parkImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
  >
    <h1 class="text-2xl font-bold text-center text-white mb-6 absolute top-4 w-full z-10">
      Vista del Parque (Isométrica)
    </h1>

    <!-- Perritos -->
    <div
      v-for="dog in parkState.dogs"
      :key="dog.id"
      class="absolute w-16 h-16 transition-all duration-1000 ease-in-out"
      :class="{ 'animate-shake-rotate': dog.isFighting }"
      :style="{ 
        left: dog.x + 'px', 
        top: dog.y + 'px', 
        transform: `translateZ(0) rotateX(30deg) rotateY(-45deg) ${dog.direction === 'left' ? 'scaleX(-1)' : ''}` 
      }"
    >
      <!-- Sombra del perro -->
      <div
        class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-black opacity-30 rounded-full"
      ></div>

      <!-- Imagen del perro -->
      <img
        src="../assets/dog.png"
        alt="Perro paseando"
        class="w-full h-full object-contain shadow-xl rounded-lg"
      />
      <!-- Emoji sobre los perros -->
      <div
        v-if="dog.isFighting || dog.isCrying"
        class="absolute top-[-30px] left-[50%] transform -translate-x-[50%] bg-white text-2xl rounded-full shadow-lg px-2"
      >
        {{ dog.isFighting ? "😡" : "😭" }}
      </div>
    </div>

    <!-- Popó -->
    <div
      v-for="poop in parkState.poop"
      :key="poop.id"
      class="absolute text-4xl cursor-pointer"
      :style="{ 
        left: poop.x + 'px', 
        top: poop.y + 'px', 
        transform: 'translateZ(0) rotateX(30deg) rotateY(-45deg)' 
      }"
      @click="collectPoop(poop.id)"
    >
      💩
    </div>

    <!-- Peleas -->
    <div
      v-for="fight in parkState.fights"
      :key="fight.id"
      class="absolute"
      :style="{ 
        left: (fight.x - fight.width / 2 - 20) + 'px', 
        top: (fight.y - fight.height / 2 - 20) + 'px', 
        width: (fight.width * 2) + 'px', 
        height: (fight.height * 2) + 'px', 
        transform: 'translateZ(0) rotateX(30deg) rotateY(-45deg)' 
      }"
    >
      <img
        src="../assets/pelea.webp"
        alt="Pelea de perros"
        class="w-full h-full object-contain"
      />
    </div>

    <!-- Contador de popó -->
    <div class="absolute top-0 right-0 bg-yellow-400 text-white font-bold p-2 rounded-bl-lg">
      Popós Limpias: {{ parkState.poopCollected }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';

// Ruta de la imagen de fondo
const parkImage = new URL('../assets/park', import.meta.url).href;

// Variables de estado para el parque
const parkState = reactive({
  dogs: [] as { id: number; x: number; y: number; direction: 'left' | 'right'; isFighting: boolean; isCrying: boolean }[],
  poop: [] as { id: number; x: number; y: number }[],
  fights: [] as {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    dog1Id: number;
    dog2Id: number;
  }[],
  poopCollected: 0,
});

// Identificadores únicos para perritos, popós y peleas
let dogId = 0;
let poopId = 0;
let fightId = 0;

// Generar posiciones aleatorias para los perritos y la popó dentro del contenedor
const generateRandomPosition = (width: number, height: number) => {
  const x = Math.random() * (width - 100);
  const y = Math.random() * (height - 100);
  return { x, y };
};

// Añadir perritos al parque
const addDog = (width: number, height: number) => {
  const { x, y } = generateRandomPosition(width, height);
  parkState.dogs.push({ id: dogId++, x, y, direction: 'right', isFighting: false, isCrying: false });
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

// Detectar peleas entre perros
const detectFights = () => {
  for (let i = 0; i < parkState.dogs.length; i++) {
    for (let j = i + 1; j < parkState.dogs.length; j++) {
      const dog1 = parkState.dogs[i];
      const dog2 = parkState.dogs[j];

      // Calcular la distancia entre los perros
      const distance = Math.sqrt(
        Math.pow(dog1.x - dog2.x, 2) + Math.pow(dog1.y - dog2.y, 2)
      );

      // Si están muy cerca, registrar una pelea
      if (distance < 60 && !dog1.isFighting && !dog2.isFighting) {
        const x = (dog1.x + dog2.x) / 2;
        const y = (dog1.y + dog2.y) / 2;

        parkState.fights.push({
          id: fightId++,
          x,
          y,
          width: 100,
          height: 100,
          dog1Id: dog1.id,
          dog2Id: dog2.id,
        });

        // Marcar perros como peleando
        dog1.isFighting = true;
        dog2.isFighting = true;

        // Terminar pelea después de 5 segundos
        setTimeout(() => {
          dog1.isFighting = false;
          dog2.isFighting = false;
        }, 5000);

        // Remover la pelea después de 5 segundos
        setTimeout(() => {
          parkState.fights = parkState.fights.filter(fight => fight.id !== fightId - 1);
        }, 5000);
      }
    }
  }
};

// Mover perros y dejar popó
const moveDogs = (width: number, height: number) => {
  parkState.dogs.forEach(dog => {
    if (!dog.isFighting) {
      const oldX = dog.x;

      dog.x += Math.random() * 300 - 150;
      dog.y += Math.random() * 300 - 150;

      dog.x = Math.max(50, Math.min(width - 150, dog.x));
      dog.y = Math.max(50, Math.min(height - 150, dog.y));

      dog.direction = dog.x < oldX ? 'left' : 'right';

      if (Math.random() < 0.2) {
        addPoop(dog.x, dog.y);
      }
    }
  });

  detectFights();
};

// Inicializar
onMounted(() => {
  const parkWidth = window.innerWidth - 320 * 2;
  const parkHeight = window.innerHeight;

  for (let i = 0; i < 5; i++) {
    addDog(parkWidth, parkHeight);
  }

  setInterval(() => {
    moveDogs(parkWidth, parkHeight);
  }, 2000);
});
</script>

<style scoped>
/* Animación de sacudida con rotación */
@keyframes shake-rotate {
  0%, 100% {
    transform: translate(0, 0) rotate(0);
  }
  25% {
    transform: translate(-5px, 0) rotate(-5deg);
  }
  75% {
    transform: translate(5px, 0) rotate(5deg);
  }
}

.animate-shake-rotate {
  animation: shake-rotate 0.3s infinite;
}
</style>
