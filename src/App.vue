<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { LayoutName } from './shared/constants/layout-name';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'


const route = useRoute();

/**
 * Computes the layout component to use based on the current route's metadata.
 * If the route has a `layout` meta field, it uses that layout.
 * If the route is the root path, it uses `NO_LAYOUT`.
 * Otherwise, it defaults to `DEFAULT_LAYOUT`.
 */
const layout = computed(() => {
  if (route.meta.layout) {
    return route.meta.layout;
  }  
  return route.path === '/' ? LayoutName.NO_LAYOUT : LayoutName.DEFAULT_LAYOUT;
});
</script>

<template>
  <!-- Dynamically renders the layout component based on the computed layout -->
  <component :is="layout" />
  <VueQueryDevtools />

</template>
