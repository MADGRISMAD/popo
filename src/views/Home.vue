<script setup>
// Este template inicial está usando Vue 3 <script setup> SFCs
// Consulta https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
    <h1 class="text-4xl font-bold mb-6 text-blue-400 animate-bounce">¡Bienvenido a Tauri!</h1>
    
    <p class="text-lg mt-8 text-gray-400 text-center max-w-md mx-auto">Esto es una plantilla fullstack para aplicaciones de escritorio hecha por madgrismad. Ya viene todo configurado para solo tener que copiar el repo y ya.</p>
    
    <div class="flex mt-8 space-x-10">
      <div class="p-6 rounded-lg bg-gray-800 shadow-lg transition-transform transform hover:scale-105">
        <h2 class="text-2xl font-semibold mb-4 text-blue-300">Backend</h2>
        <div class="flex flex-col items-center">
          <a href="https://www.rust-lang.org/" target="_blank" class="mb-4">
            <img src="../assets/rust.png" class="logo h-16" alt="Logo de Rust" />
          </a>
          <a href="https://tauri.app" target="_blank">
            <img src="/tauri.svg" class="logo h-16" alt="Logo de Tauri" />
          </a>
        </div>
      </div>
      <div class="p-6 rounded-lg bg-gray-800 shadow-lg transition-transform transform hover:scale-105">
        <h2 class="text-2xl font-semibold mb-4 text-blue-300">Frontend</h2>
        <div class="flex flex-col items-center">
          <a href="https://vitejs.dev" target="_blank" class="mb-4">
            <img src="/vite.svg" class="logo h-16" alt="Logo de Vite" />
          </a>
          <a href="https://vuejs.org/" target="_blank" class="mb-4">
            <img src="../assets/vue.svg" class="logo h-16" alt="Logo de Vue" />
          </a>
          <a href="https://tailwindcss.com/" target="_blank" class="mb-4">
            <img src="../assets/tailwind.png" class="logo h-16" alt="Logo de Tailwind CSS" />
          </a>
          <a href="https://router.vuejs.org/" target="_blank">
            <img src="../assets/vueR.png" class="logo h-16" alt="Logo de Vue Router" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  transition: transform 0.75s, filter 0.75s;
}
.logo:hover {
  transform: rotate(10deg) scale(1.1);
}
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}
.logo.tauri:hover {
  filter: drop-shadow(0 0 2em #24c8db);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
.logo.rust:hover {
  filter: drop-shadow(0 0 2em #f74c00);
}
.logo.tailwindcss:hover {
  filter: drop-shadow(0 0 2em #38bdf8);
}
.logo.vuerouter:hover {
  filter: drop-shadow(0 0 2em #41b883);
}
</style>
