<script setup lang="ts" generic="T">
import type { Column } from '@tanstack/vue-table'
import type { Component } from 'vue'
import { cn } from '@/shared/lib/utils'
import { computed } from 'vue'
import { Badge } from '@/shared/components/ui/badge'
import { Separator } from '@/shared/components/ui/separator'
import { Button } from '@/shared/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/components/ui/popover'
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from '@/shared/components/ui/command'
import { Check, PlusCircle } from 'lucide-vue-next'

export interface DataTableFacetedFilter<T> {
  column?: Column<T, any>
  title?: string
  options: {
    label: string
    value: string
    icon?: Component
  }[]
}

const props = defineProps<DataTableFacetedFilter<T>>()

const facets = computed(() => props.column?.getFacetedUniqueValues())
const selectedValues = computed(() => new Set(props.column?.getFilterValue() as string[]))
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" size="sm" class="h-8 border-dashed">
        <PlusCircle class="mr-2 h-4 w-4" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <Separator orientation="vertical" class="mx-2 h-4" />
          <!-- Custom badge slot -->
          <slot name="badge" :selected="Array.from(selectedValues)" :count="selectedValues.size">
            <Badge
              variant="secondary"
              class="rounded-sm px-1 font-normal lg:hidden"
            >
              {{ selectedValues.size }}
            </Badge>
            <div class="hidden lg:flex space-x-1">
              <Badge
                v-if="selectedValues.size > 2"
                variant="secondary"
                class="rounded-sm px-1 font-normal"
              >
                {{ $t('selected_count', { count: selectedValues.size }) }}
              </Badge>

              <template v-else>
                <Badge
                  v-for="item in options
                    .filter((option: any) => selectedValues.has(option.value))"
                  :key="item.value"
                  variant="secondary"
                  class="rounded-sm px-1 font-normal"
                >
                  {{ item.label }}
                </Badge>
              </template>
            </div>
          </slot>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0" align="start">
      <Command
        :filter-function="(val: any[], term: string) => {
          return val.filter(item => 
            typeof item === 'object' && 
            'label' in item && 
            item.label.toLowerCase().includes(term.toLowerCase())
          )
        }"
      >
        <CommandInput :placeholder="$t('search')" />
        <CommandList>
          <CommandEmpty>{{ $t('no_results') }}</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option"
              @select="(e: any) => {
                const isSelected = selectedValues.has(option.value)
                if (isSelected) {
                  selectedValues.delete(option.value)
                } else {
                  selectedValues.add(option.value)
                }
                const filterValues = Array.from(selectedValues)
                column?.setFilterValue(filterValues.length ? filterValues : undefined)
              }"
            >
              <!-- Custom option slot -->
              <slot name="option" :option="option" :selected="selectedValues.has(option.value)" :count="facets?.get(option.value)">
                <div
                  :class="cn(
                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                    selectedValues.has(option.value)
                      ? 'bg-primary text-primary-foreground'
                      : 'opacity-50 [&_svg]:invisible',
                  )"
                >
                  <Check :class="cn('h-4 w-4')" />
                </div>
                <component :is="option.icon" v-if="option.icon" class="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{{ option.label }}</span>
                <span v-if="facets?.get(option.value)" class="ml-auto h-4 w-4 flex items-center justify-center text-xs font-mono">
                  {{ facets.get(option.value) }}
                </span>
              </slot>
            </CommandItem>
          </CommandGroup>

          <template v-if="selectedValues.size > 0">
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                :value="{ label: $t('clear_filters') }"
                class="justify-center text-center"
                @select="column?.setFilterValue(undefined)"
              >
                {{ $t('clear_filters') }}
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<fluent locale="en">
search = Search
no_results = No results found
clear_filters = Clear filters
selected_count = { $count } selected
</fluent>