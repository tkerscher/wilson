import { createPinia } from "pinia";
import { createApp } from "vue";
import Plot from './App.Plot.vue';

createApp(Plot)
.use(createPinia())
.mount('#app');
