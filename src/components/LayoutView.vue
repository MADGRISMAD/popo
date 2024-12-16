<template>
  <div
    class="flex h-screen bg-ctr-screen bg-cover bg-center filter-ctr crt-effect"
  >
    <!-- Sidebar izquierda -->
    <div class="w-80 bg-green-500/80 text-white">
      <SidebarLeft />
    </div>

    <!-- Área principal -->
    <div class="flex-1 bg-gray-100/80">
      <router-view />
    </div>

    <!-- Sidebar derecha -->
    <div class="w-80 bg-blue-500/80 text-white">
      <SidebarRight />
    </div>
  </div>
</template>

<script setup>
import SidebarLeft from './SidebarLeft.vue';
import SidebarRight from './SidebarRight.vue';
</script>

<style scoped>
/* Filtro CRT */
.filter-ctr {
  filter: contrast(1.4) brightness(0.85) saturate(1.5);
  position: relative;
  overflow: hidden;
}

/* Efecto CRT: Rayas horizontales */
.filter-ctr::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    rgba(0, 0, 0, 0.3) 10%,
    transparent 90%
  ); /* Rayas grandes */
  background-size: 100% 6px; /* Tamaño de las rayas */
  pointer-events: none;
  z-index: 2;
  opacity: 0.3; /* Más visibles */
}

/* Granulado visible */
.filter-ctr::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wMAAfsBnRk65gAAAABJRU5ErkJggg=='); /* Patrón de ruido */
  background-repeat: repeat;
  background-size: 2px 2px; /* Más granular */
  pointer-events: none;
  z-index: 3;
  opacity: 0.15;
}
</style>
