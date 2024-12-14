import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Greet from '../views/Greet.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/greet',
        name: 'Greet',
        component: Greet,

    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;