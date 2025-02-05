<script setup lang="ts" generic="T">
import type { Table } from '@tanstack/vue-table'
import { computed } from 'vue'
import { Button } from '@/shared/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem } from '@/shared/components/ui/dropdown-menu'
import { SlidersHorizontal } from 'lucide-vue-next' // Lucide icon

export interface DataTableViewOptionsProps<T> {
  table: Table<T>
}

const props = defineProps<DataTableViewOptionsProps<T>>();

const columns = computed(() => props.table.getAllColumns()
  .filter(
    column =>
      typeof column.accessorFn !== 'undefined' && column.getCanHide(),
  ))
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        class="ml-auto hidden h-8 lg:flex"
      >
        <SlidersHorizontal class="mr-2 h-4 w-4" />
        {{ $t('view') }}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[150px]">
      <DropdownMenuLabel>{{ $t('toggle_columns') }}</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuCheckboxItem
        v-for="column in columns"
        :key="column.id"
        class="capitalize"
        :checked="column.getIsVisible()"
        @update:checked="(value) => column.toggleVisibility(!!value)"
      >
        {{ column.id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<fluent locale="en">
view = View
toggle_columns = Toggle columns
</fluent>

<fluent locale="fr">
view = Vue
toggle_columns = Basculer les colonnes
</fluent>