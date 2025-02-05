<script setup lang=ts>
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from '@/shared/components/ui/sidebar'
import MenuUser from '@/shared/components/layouts/menu-user.vue'
import MenuList from '@/shared/components/layouts/menu-list.vue'
import BreadcrumbSideBar from '@/shared/components/layouts/breadcrumb-side-bar.vue'
import SidebarHeader from '@/shared/components/layouts/sidebar-header.vue'

</script>

<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader/>
      <MenuList/>
      <MenuUser/>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <BreadcrumbSideBar />
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        <router-view />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
