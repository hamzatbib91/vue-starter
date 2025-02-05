import './assets/index.css' // Import the global CSS file

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import initModules from './modules';
import initLayouts from './shared/layouts';
import initPlugins from './plugins';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';


const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
    },
  });

/**
 * Initializes the Vue application with the specified components, plugins, and modules.
 */
const app = createApp(App);

initLayouts(app); // Initialize layouts
initPlugins(app); // Initialize plugins
initModules({ app, router }); // Initialize modules

app.use(VueQueryPlugin, { queryClient }); // Use Vue Query
app.use(router) // Use the router
app.mount('#app') // Mount the app to the DOM

app.use(createPinia()) // Use Pinia for state management
