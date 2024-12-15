<template>
    <div class="flex h-screen">
      <!-- Sidebar izquierda -->
      <div class="w-80 bg-green-500 text-white">
        <SidebarLeft />
      </div>
  
      <!-- Área principal -->
      <div class="flex-1 bg-gray-100">
        <router-view />
      </div>
  
      <!-- Sidebar derecha -->
      <div class="w-80 bg-blue-500 text-white">
        <SidebarRight />
      </div>
    </div>
  </template>
  
  
  <script setup>
  import SidebarLeft from './SidebarLeft.vue';
  import SidebarRight from './SidebarRight.vue';
  </script>
  