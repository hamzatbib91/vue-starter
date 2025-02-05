<script setup lang="ts" generic="T">
import type { Table } from '@tanstack/vue-table'
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-vue-next'
import { Button } from '@/shared/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'


export interface DataTablePaginationProps<T> {
  table: Table<T>
}

defineProps<DataTablePaginationProps<T>>();
</script>

<template>
  <div class="flex items-center justify-between px-2">
    <div class="flex-1 text-sm text-muted-foreground">
      {{ $t('selected_count', {
        selected: table.getFilteredSelectedRowModel().rows.length,
        total: table.getFilteredRowModel().rows.length
      }) }}
    </div>
    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">
          {{ $t('rows_per_page') }}
        </p>
        <Select
          :model-value="`${table.getState().pagination.pageSize}`"
          @update:model-value="value => table.setPageSize(Number(value))"
          >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" :value="`${pageSize}`">
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="w-[100px] flex items-center justify-center text-sm font-medium">
        {{ $t('page_count', {
          current: table.getState().pagination.pageIndex + 1,
          total: table.getPageCount()
        }) }}
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          class="hidden h-8 w-8 p-0 lg:flex"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <span class="sr-only">{{ $t('first_page') }}</span>
          <ChevronsLeft class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="h-8 w-8 p-0"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <span class="sr-only">{{ $t('previous_page') }}</span>
          <ChevronLeft class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="h-8 w-8 p-0"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <span class="sr-only">{{ $t('next_page') }}</span>
          <ChevronRight class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden h-8 w-8 p-0 lg:flex"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="sr-only">{{ $t('last_page') }}</span>
          <ChevronsRight class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>

<fluent locale="en">
selected_count = { $selected } of { $total } row(s) selected
rows_per_page = Rows per page
page_count = Page { $current } of { $total }
first_page = Go to first page
previous_page = Go to previous page
next_page = Go to next page
last_page = Go to last page
</fluent>

<fluent locale="fr">
selected_count = { $selected } sur { $total } ligne(s) sélectionnée(s)
rows_per_page = Lignes par page
page_count = Page { $current } sur { $total }
first_page = Aller à la première page
previous_page = Page précédente
next_page = Page suivante
last_page = Dernière page
</fluent>