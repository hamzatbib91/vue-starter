<script lang="ts" setup>
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar'
import {  
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'

</script>
<template>
    <SidebarHeader>
        <SidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Avatar class="h-8 w-8 rounded-lg">
                    <AvatarImage src="/favicon.ico" alt="logo" />
                    <AvatarFallback class="rounded-lg">
                      VS
                    </AvatarFallback>
                  </Avatar>                  </div>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">vue3 </span>
                    <span class="truncate text-xs">starter</span>
                  </div>
                </SidebarMenuButton>
      </SidebarHeader>
</template>
