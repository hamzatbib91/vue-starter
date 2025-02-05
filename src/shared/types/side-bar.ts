import type { Component } from 'vue'

// Define the type for sub-items
type SubItem = {
  title: string
  url: string
}

// Define the type for grouped items
type ItemGroup = {
  title: string
  icon: Component // Use `Component` from `vue` to type the icon
  url?: string
  isActive?: boolean
  items?: SubItem[]
}

// Define the type for the main menu
type MenuItem = {
  name: string
  key: string
  itemsGroupe: ItemGroup[]
}

// Final type for the `MENULISTDEFULT` array
export type TMenuList = MenuItem[]
