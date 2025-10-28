// Mock initial tickets with more realistic data
import type { Ticket } from "../types/ticket";
import { Zap, Shield, BarChart3, Users, Bell, Clock } from 'lucide-vue-next'

export const initialTickets: Ticket[] = [
  {
    id: "1",
    title: "Fix login authentication bug",
    status: "open",
    description: "Users are experiencing issues logging in with valid credentials. Need to investigate the authentication flow and session management.",
    priority: "high",
    assignee: "Sarah Johnson",
    createdAt: "2025-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Update dashboard UI components",
    status: "in_progress",
    description: "Modernize the dashboard interface with the new design system. Update colors, spacing, and component styles.",
    priority: "medium",
    assignee: "Michael Chen",
    createdAt: "2025-01-14T14:20:00Z",
  },
  {
    id: "3",
    title: "Add export functionality for reports",
    status: "closed",
    description: "Allow users to export ticket data to CSV and PDF formats. Include filters for date range and status.",
    priority: "low",
    assignee: "Emma Williams",
    createdAt: "2025-01-10T09:15:00Z",
  },
  {
    id: "4",
    title: "Implement real-time notifications",
    status: "in_progress",
    description: "Add WebSocket support for real-time ticket updates and notifications. Show toast messages for new tickets.",
    priority: "high",
    assignee: "David Martinez",
    createdAt: "2025-01-16T11:45:00Z",
  },
  {
    id: "5",
    title: "Optimize database queries",
    status: "open",
    description: "Improve performance of ticket listing and search queries. Add proper indexing and caching.",
    priority: "medium",
    assignee: "Lisa Anderson",
    createdAt: "2025-01-17T08:00:00Z",
  },
];

export const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Quick ticket creation and resolution with an intuitive interface designed for speed.',
    gradient: 'gradient-purple-pink',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description:
      'Enterprise-grade security ensuring your data is always protected and accessible.',
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
  },
  {
    icon: BarChart3,
    title: 'Powerful Analytics',
    description:
      'Gain insights with comprehensive reports and real-time ticket statistics.',
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-600',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description:
      'Assign tickets, track progress, and collaborate seamlessly with your team.',
    gradient: 'bg-gradient-to-br from-orange-500 to-amber-600',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description:
      'Stay updated with intelligent alerts for ticket updates and assignments.',
    gradient: 'bg-gradient-to-br from-violet-500 to-purple-600',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description:
      'Access your tickets anytime, anywhere with our cloud-based platform.',
    gradient: 'bg-gradient-to-br from-pink-500 to-rose-600',
  },
]
