<script setup lang="ts" generic="T">
import type { Table } from '@tanstack/vue-table'
import { computed, type Component } from 'vue'
import DataTableFacetedFilter from './data-table-faceted-filter.vue'
import DataTableViewOptions from './data-table-view-options.vue'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'

import { cn } from '@/shared/lib/utils'


export interface TableFacet<T extends { search?: string }> {
  columnName: keyof T
  title: string
  options: Array<{
    label: string
    value: string
    icon?: Component
  }>
}

export interface DataTableToolbarProps<T extends { search?: string }> {
  table: Table<T>
  searchColumn?: keyof T & string
  facets?: TableFacet<T>[]
  class?: string
}

const props = withDefaults(defineProps<DataTableToolbarProps<(T & { search?: string })>>(), {
  searchColumn: 'search' as never,
  facets: () => []
})

const emit = defineEmits<{
  (e: 'reset'): void
}>()

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
</script>

<template>
  <div :class="cn('flex items-center justify-between', props.class)">
    <div class="flex flex-1 items-center space-x-2">
      <!-- Search Input -->
      <Input
        v-if="props.searchColumn"
        :placeholder="$t('filter-placeholder')"
        :model-value="String(props.table.getColumn(props.searchColumn)?.getFilterValue() ?? '')"
        class="h-8 w-[150px] lg:w-[250px]"
        @input="table.getColumn(props.searchColumn)?.setFilterValue($event.target.value)"
      />
      <!-- Dynamic Faceted Filters -->
      <template v-for="facet in facets" :key="facet.columnName">
        <DataTableFacetedFilter
          v-if="table.getColumn(facet.columnName as string)"
          :column="table.getColumn(facet.columnName as string)"
          :title="facet.title"
          :options="facet.options"
        />
      </template>

      <!-- Reset Button -->
      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="() => {
          table.resetColumnFilters()
          emit('reset')
        }"
      >
        {{ $t('reset-filters') }}
        <Icon name="i-radix-icons-cross-2" class="ml-2 h-4 w-4" />
      </Button>
    </div>

    <!-- View Options -->
    <DataTableViewOptions :table="table" />
  </div>
</template>

<fluent locale="en">
filter-placeholder = Filter records...
reset-filters = Reset
</fluent>