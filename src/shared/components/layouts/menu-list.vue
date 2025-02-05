<script lang="ts" setup>
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/shared/components/ui/sidebar'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible'

import {
  ChevronRight,
} from 'lucide-vue-next'
import { computed } from 'vue';
import { MENULISTDEFULT } from '@/shared/constants/menu-list';

const menuList  = computed(() => {
  return MENULISTDEFULT;
});

</script>
<template>
    <SidebarContent>
      <!-- Iterate through groups in the data array -->
      <SidebarGroup
        v-for="group in menuList"
        :key="group.name"
      >
        <!-- Group Label -->
        <SidebarGroupLabel>{{ group.name }}</SidebarGroupLabel>
        
        <SidebarMenu>
          <!-- Check if items are nested (with sub-items) -->
          <template v-for="(item , index) in group.itemsGroupe" :key="index">
            <!-- If item has sub-items -->
            <Collapsible
              v-if="item.items"
              as-child
              :default-open="item.isActive"
              class="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton :tooltip="item.title">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                    <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem
                      v-for="subItem in item.items"
                      :key="subItem.title"
                    >
                      <SidebarMenuSubButton as-child>
                        <a :href="subItem.url">
                          <span>{{ subItem.title }}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            
            <!-- If item is a single link -->
            <SidebarMenuItem v-else>
              <SidebarMenuButton as-child>
                <a :href="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </template>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </template>
  