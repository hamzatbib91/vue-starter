<template>
    <header
      class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
    >
      <div class="flex items-center gap-2 px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <template v-for="(item, index) in items" :key="index">
              <BreadcrumbItem
                :class="{ 'hidden md:block': index !== items.length - 1 }"
              >
                <template v-if="item.href">
                  <BreadcrumbLink :href="item.href">{{ item.label }}</BreadcrumbLink>
                </template>
                <template v-else>
                  <BreadcrumbPage>{{ item.label }}</BreadcrumbPage>
                </template>
              </BreadcrumbItem>
              <BreadcrumbSeparator
                v-if="index !== items.length - 1"
                class="hidden md:block"
              />
            </template>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>

</template>
  
<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/components/ui/breadcrumb'
import { Separator } from '@/shared/components/ui/separator'
import {
  SidebarTrigger,
} from '@/shared/components/ui/sidebar'
import { useRoute } from 'vue-router';
import { computed } from 'vue';


const route = useRoute();


const items = computed(() => {
  return (route.meta.breadcrumbOptions ?? []) as { label: string; href?: string }[];
});


  </script>
  