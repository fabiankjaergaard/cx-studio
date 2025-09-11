'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useSidebar } from '@/contexts/SidebarContext'
import Image from 'next/image'
import { 
  MapIcon, 
  HomeIcon, 
  BookTemplateIcon, 
  BarChart3Icon,
  UsersIcon,
  SettingsIcon,
  BookOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon,
  LogOutIcon,
  ClipboardListIcon,
  RouteIcon
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Journey Maps', href: '/journey-maps', icon: RouteIcon },
  { name: 'Templates', href: '/templates', icon: BookTemplateIcon },
  { name: 'Analytics', href: '/analytics', icon: BarChart3Icon },
  { name: 'Personas', href: '/personas', icon: UsersIcon },
  { name: 'Insights', href: '/insights', icon: ClipboardListIcon },
  { name: 'Glossary', href: '/glossary', icon: BookOpenIcon },
  { name: 'Settings', href: '/settings', icon: SettingsIcon },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isCollapsed, setIsCollapsed } = useSidebar()
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Mock login state
  const [userName] = useState('John Doe') // Mock user name

  return (
    <div className={cn(
      "flex h-full flex-col bg-white border-r border-gray-200 transition-all duration-300 relative group",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className={cn(
        "flex items-center justify-center border-b border-gray-200",
        isCollapsed ? "h-20 px-2" : "h-16 px-6"
      )}>
        <div className="flex items-center justify-center flex-1">
          {!isCollapsed ? (
            <img 
              src="/Nava blue text.png" 
              alt="Nava" 
              className="h-24 w-auto object-contain max-w-[300px]"
            />
          ) : (
            <img 
              src="/nava small.png" 
              alt="Nava" 
              className="h-16 w-12 object-contain"
            />
          )}
        </div>
      </div>
      
      {/* Collapse/Expand Button - appears on hover as a circle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-1/2 -translate-y-1/2 -right-2 w-6 h-6 bg-white border-2 border-gray-300 rounded-full hover:border-gray-500 transition-all duration-200 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100"
        title={isCollapsed ? "Expand menu" : "Minimize menu"}
        style={{ zIndex: 10 }}
      >
        {isCollapsed ? (
          <ChevronRightIcon className="h-3 w-3 text-gray-600" />
        ) : (
          <ChevronLeftIcon className="h-3 w-3 text-gray-600" />
        )}
      </button>
      
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
                  <p className="text-xs text-gray-500 truncate">Logged in</p>
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
              title={isCollapsed ? "Log out" : undefined}
            >
              <LogOutIcon className={cn(
                "h-5 w-5 text-gray-400",
                isCollapsed ? "mx-auto" : "mr-3"
              )} />
              {!isCollapsed && "Log out"}
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
            title={isCollapsed ? "Log in" : undefined}
          >
            <UserIcon className={cn(
              "h-5 w-5 text-gray-400",
              isCollapsed ? "mx-auto" : "mr-3"
            )} />
            {!isCollapsed && "Log in"}
          </button>
        )}
      </div>
    </div>
  )
}