'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useSidebar } from '@/contexts/SidebarContext'
import { 
  MapIcon, 
  HomeIcon, 
  BookTemplateIcon, 
  BarChart3Icon,
  UsersIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon,
  LogOutIcon
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Journey Maps', href: '/journeys', icon: MapIcon },
  { name: 'Templates', href: '/templates', icon: BookTemplateIcon },
  { name: 'Analytics', href: '/analytics', icon: BarChart3Icon },
  { name: 'Personas', href: '/personas', icon: UsersIcon },
  { name: 'Settings', href: '/settings', icon: SettingsIcon },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isCollapsed, setIsCollapsed } = useSidebar()
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Mock login state
  const [userName] = useState('John Doe') // Mock user name

  return (
    <div className={cn(
      "flex h-full flex-col bg-white border-r border-gray-200 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
        {!isCollapsed && <h1 className="text-xl font-bold text-gray-900">CX Studio</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          title={isCollapsed ? "Expandera meny" : "Minimera meny"}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
      
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'group flex items-center rounded-lg text-sm font-medium transition-colors',
                    isCollapsed ? 'px-2 py-2 justify-center' : 'px-3 py-2',
                    isActive
                      ? 'bg-slate-100 text-slate-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon
                    className={cn(
                      'h-5 w-5 transition-colors',
                      isCollapsed ? 'mx-auto' : 'mr-3',
                      isActive
                        ? 'text-slate-600'
                        : 'text-gray-400 group-hover:text-gray-500'
                    )}
                  />
                  {!isCollapsed && item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      
      {/* User Section */}
      <div className="border-t border-gray-200 p-4">
        {isLoggedIn ? (
          <div className="space-y-2">
            {/* User Info */}
            <div className={cn(
              "flex items-center rounded-lg p-2 transition-colors hover:bg-gray-50",
              isCollapsed ? "justify-center" : ""
            )}>
              <UserIcon className={cn(
                "h-5 w-5 text-gray-400",
                isCollapsed ? "mx-auto" : "mr-3"
              )} />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{userName}</p>
                  <p className="text-xs text-gray-500 truncate">Inloggad</p>
                </div>
              )}
            </div>
            
            {/* Logout Button */}
            <button
              onClick={() => setIsLoggedIn(false)}
              className={cn(
                "w-full flex items-center rounded-lg text-sm font-medium transition-colors text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                isCollapsed ? "px-2 py-2 justify-center" : "px-3 py-2"
              )}
              title={isCollapsed ? "Logga ut" : undefined}
            >
              <LogOutIcon className={cn(
                "h-5 w-5 text-gray-400",
                isCollapsed ? "mx-auto" : "mr-3"
              )} />
              {!isCollapsed && "Logga ut"}
            </button>
          </div>
        ) : (
          /* Login Button */
          <button
            onClick={() => setIsLoggedIn(true)}
            className={cn(
              "w-full flex items-center rounded-lg text-sm font-medium transition-colors text-gray-700 hover:bg-gray-50 hover:text-gray-900",
              isCollapsed ? "px-2 py-2 justify-center" : "px-3 py-2"
            )}
            title={isCollapsed ? "Logga in" : undefined}
          >
            <UserIcon className={cn(
              "h-5 w-5 text-gray-400",
              isCollapsed ? "mx-auto" : "mr-3"
            )} />
            {!isCollapsed && "Logga in"}
          </button>
        )}
      </div>
    </div>
  )
}