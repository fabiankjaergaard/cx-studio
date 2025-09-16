export interface ChannelType {
  id: string
  name: string
  icon: string
  color: string
  bgColor: string
}

export const CHANNEL_TYPES: ChannelType[] = [
  {
    id: 'in-person',
    name: 'In person',
    icon: '👤',
    color: 'text-red-600',
    bgColor: 'bg-red-500'
  },
  {
    id: 'email',
    name: 'Email',
    icon: '📧',
    color: 'text-blue-600',
    bgColor: 'bg-blue-500'
  },
  {
    id: 'in-app',
    name: 'In app',
    icon: '📱',
    color: 'text-gray-600',
    bgColor: 'bg-gray-500'
  },
  {
    id: 'support',
    name: 'Support',
    icon: '🎧',
    color: 'text-green-600',
    bgColor: 'bg-green-500'
  },
  {
    id: 'helpdesk',
    name: 'Helpdesk',
    icon: '🎫',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-500'
  },
  {
    id: 'phone',
    name: 'Phone',
    icon: '📞',
    color: 'text-purple-600',
    bgColor: 'bg-purple-500'
  },
  {
    id: 'chat',
    name: 'Chat',
    icon: '💬',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-500'
  },
  {
    id: 'website',
    name: 'Website',
    icon: '🌐',
    color: 'text-teal-600',
    bgColor: 'bg-teal-500'
  }
]