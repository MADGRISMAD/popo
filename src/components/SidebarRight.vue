<template>
  <aside class="w-full h-full bg-gradient-to-b from-blue-800 to-blue-600 text-white flex flex-col items-center p-6 space-y-6">
    <!-- Título -->
    <h2 class="text-2xl font-extrabold tracking-wider uppercase border-b-2 border-blue-400 pb-2">
      Mejoras
    </h2>

    <!-- Lista de Mejoras -->
    <ul class="w-full space-y-6">
      <!-- Mejora 1 -->
      <li
        class="flex flex-col items-center bg-blue-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
      >
        <!-- Icono -->
        <div class="bg-yellow-300 w-16 h-16 flex items-center justify-center rounded-full mb-4">
          <span class="text-4xl">💎</span>
        </div>
        <p class="text-lg font-semibold mb-2">Collar Dorado</p>
        <p class="text-sm text-blue-200 mb-4">+10 popós por clic</p>
        <p class="text-sm text-blue-300">
          Comprado: <span class="font-bold">0</span> veces
        </p>
        <button
          class="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-bold shadow-md hover:shadow-lg hover:bg-yellow-500 transition-all"
        >
          Comprar (50 💩)
        </button>
      </li>

      <!-- Mejora 2 -->
      <li
        class="flex flex-col items-center bg-blue-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
      >
        <!-- Icono -->
        <div class="bg-yellow-300 w-16 h-16 flex items-center justify-center rounded-full mb-4">
          <span class="text-4xl">⚙️</span>
        </div>
        <p class="text-lg font-semibold mb-2">Recolector Automático</p>
        <p class="text-sm text-blue-200 mb-4">+50 popós por minuto</p>
        <p class="text-sm text-blue-300">
          Comprado: <span class="font-bold">0</span> veces
        </p>
        <button
          class="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-bold shadow-md hover:shadow-lg hover:bg-yellow-500 transition-all"
        >
          Comprar (200 💩)
        </button>
      </li>

      <!-- Mejora 3 -->
      <li
        class="flex flex-col items-center bg-blue-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
      >
        <!-- Icono -->
        <div class="bg-yellow-300 w-16 h-16 flex items-center justify-center rounded-full mb-4">
          <span class="text-4xl">👟</span>
        </div>
        <p class="text-lg font-semibold mb-2">Super Botas</p>
        <p class="text-sm text-blue-200 mb-4">Los perros caminan más rápido</p>
        <p class="text-sm text-blue-300">
          Comprado: <span class="font-bold">0</span> veces
        </p>
        <button
          class="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-bold shadow-md hover:shadow-lg hover:bg-yellow-500 transition-all"
        >
          Comprar (100 💩)
        </button>
      </li>
    </ul>
  </aside>
</template>

<script setup>
</script>

<style scoped>
/* Sombra para el contenedor principal */
aside {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
</style>
