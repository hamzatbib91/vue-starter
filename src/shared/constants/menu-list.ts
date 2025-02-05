import { ChevronRight, Folder } from 'lucide-vue-next'
import type { TMenuList } from '../types/side-bar'

export const MENULISTDEFULT: TMenuList = [
  {
    name: 'Platform',
    key: 'platform',
    itemsGroupe: [
      {
        title: 'Dashboard',
        icon: ChevronRight,
        isActive: true,
        items: [
          { title: 'Overview', url: '/dashboard/overview' },
          { title: 'Analytics', url: '/dashboard/analytics' },
        ],
      },
      {
        title: 'Settings',
        icon: Folder,
        isActive: false,
        items: [
          { title: 'General', url: '/settings/general' },
          { title: 'Account', url: '/settings/account' },
        ],
      },
    ],
  },
  {
    name: 'Projects',
    key: 'projects',
    itemsGroupe: [
      {
        title: 'Project Alpha',
        url: '/projects/alpha',
        icon: Folder,
      },
      {
        title: 'Project Beta',
        url: '/projects/beta',
        icon: Folder,
      },
    ],
  },
]



