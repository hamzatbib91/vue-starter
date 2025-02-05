<script setup lang="ts" generic="T">
import { ref, computed, watchEffect } from 'vue'
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, PaginationState } from '@tanstack/vue-table'
import { valueUpdater } from '@/shared/lib/utils'
import {
  FlexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import DataTablePagination from './data-table-pagination.vue'
import DataTableToolbar from './data-table-toolbar.vue'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table'


export interface DataTableProps<T extends { search?: string }> {
  columns: ColumnDef<T>[]
  data: T[]
  totalRows: number
  currentPage: number
  pageSize: number
}

const props = defineProps<DataTableProps<T & { search?: string }>>();
const emit = defineEmits<{
  'update:columnFilters': [value: ColumnFiltersState]
  'update:currentPage': [value: number]
  'update:pageSize': [value: number]
}>()

// Pagination state
const pagination = ref<PaginationState>({
  pageIndex: props.currentPage - 1, // TanStack uses 0-based index
  pageSize: props.pageSize,
})

// Update pagination when props change
watchEffect(() => {
  pagination.value = {
    pageIndex: props.currentPage - 1,
    pageSize: props.pageSize
  }
})

// Table state
const columnFilters = ref<ColumnFiltersState>([])
const sorting = ref<SortingState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
    get pagination() { return pagination.value }
  },
  manualPagination: true,
  pageCount: Math.ceil(props.totalRows / props.pageSize),
  onPaginationChange: updaterOrValue => {
    const newValue = typeof updaterOrValue === 'function' ? updaterOrValue(pagination.value) : updaterOrValue
    pagination.value = newValue
    emit('update:currentPage', newValue.pageIndex + 1)
    emit('update:pageSize', newValue.pageSize)
  },
  enableRowSelection: true,
  manualFiltering: true,
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
})
</script>

<template>
  <div class="space-y-4">
    <DataTableToolbar :table="table" />
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell
              :colspan="columns.length"
              class="h-24 text-center"
            >
              {{ $t('no-results') }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <DataTablePagination 
      :table="table"
    />
  </div>
</template>

<fluent locale="en">
no-results = No results.
</fluent>