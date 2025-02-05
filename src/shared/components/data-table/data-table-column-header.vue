<script setup lang="ts" generic="T">
import type { Column } from '@tanstack/vue-table'
import { cn } from '@/shared/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu'
import { Button } from '@/shared/components/ui/button'
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from 'lucide-vue-next' // Import Lucide icons

export interface DataTableColumnHeaderProps<T> {
  column: Column<T>
  title: string
  class?: string
}

const props = defineProps<DataTableColumnHeaderProps<T>>()
</script>

<template>
  <div :class="cn('flex items-center space-x-2', $attrs.class ?? '')">
    <DropdownMenu v-if="column.getCanSort()">
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          size="sm"
          class="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          <span>{{ title }}</span>
          <ArrowDown
            v-if="column.getIsSorted() === 'desc'"
            class="ml-2 h-4 w-4"
          />
          <ArrowUp
            v-else-if="column.getIsSorted() === 'asc'"
            class="ml-2 h-4 w-4"
          />
          <ChevronsUpDown
            v-else
            class="ml-2 h-4 w-4"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem @click="column.toggleSorting(false)">
          <ArrowUp class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          {{ $t('asc') }}
        </DropdownMenuItem>
        <DropdownMenuItem @click="column.toggleSorting(true)">
          <ArrowDown class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          {{ $t('desc') }}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="column.toggleVisibility(false)">
          <EyeOff class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          {{ $t('hide') }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    
    <span v-else :class="props.class">
      {{ title }}
    </span>
  </div>
</template>

<fluent locale="en">
asc = Ascending
desc = Descending
hide = Hide Column
</fluent>