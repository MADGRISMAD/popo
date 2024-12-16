import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';

// Ajustar siempre al tamaño del viewport
const fixViewport = () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
};

window.addEventListener('resize', fixViewport);
fixViewport();

// Crear la aplicación Vue
const app = createApp(App);
app.use(router);
app.mount('#app');
