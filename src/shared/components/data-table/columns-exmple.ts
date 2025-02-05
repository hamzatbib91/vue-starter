import type { ColumnDef } from '@tanstack/vue-table'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { h } from 'vue'
import DataTableColumnHeader from './data-table-column-header.vue'

type TypeTableData = {name: string; id: string};

export const columns: ColumnDef<TypeTableData, unknown>[] = [
  {
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
      'class': 'translate-y-0.5',
    }),
    cell: ({ row }) => h(Checkbox, { 'checked': row.getIsSelected(), 'onUpdate:checked': value => row.toggleSelected(!!value), 'ariaLabel': 'Select row', 'class': 'translate-y-0.5' }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => h(DataTableColumnHeader<TypeTableData>, { column, title: 'id' }),
    cell: ({ row }) => h('div', { class: 'w-fit' }, row.getValue('id')),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => h(DataTableColumnHeader<TypeTableData>, { column, title: 'Name' }),

    cell: ({ row }) => {
      return h('div', { class: 'w-full flex space-x-2' }, [
        h('span', { class: 'max-w-[500px]  truncate font-medium' }, row.getValue('name')),
      ])
    },
  },
  
  
]
