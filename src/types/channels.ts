import { LucideIcon, UserIcon, MailIcon, SmartphoneIcon, HeadphonesIcon, TicketIcon, PhoneIcon, MessageSquareIcon, GlobeIcon } from 'lucide-react'

export interface ChannelType {
  id: string
  name: string
  icon: LucideIcon
  color: string
  bgColor: string
}

export const CHANNEL_TYPES: ChannelType[] = [
  {
    id: 'in-person',
    name: 'In person',
    icon: UserIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500'
  },
  {
    id: 'email',
    name: 'Email',
    icon: MailIcon,
    color: 'text-slate-600',
    bgColor: 'bg-slate-500'
  },
  {
    id: 'in-app',
    name: 'In app',
    icon: SmartphoneIcon,
    color: 'text-gray-600',
    bgColor: 'bg-gray-500'
  },
  {
    id: 'support',
    name: 'Support',
    icon: HeadphonesIcon,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-500'
  },
  {
    id: 'helpdesk',
    name: 'Helpdesk',
    icon: TicketIcon,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-500'
  },
  {
    id: 'phone',
    name: 'Phone',
    icon: PhoneIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-500'
  },
  {
    id: 'chat',
    name: 'Chat',
    icon: MessageSquareIcon,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-500'
  },
  {
    id: 'website',
    name: 'Website',
    icon: GlobeIcon,
    color: 'text-teal-600',
    bgColor: 'bg-teal-500'
  }
]