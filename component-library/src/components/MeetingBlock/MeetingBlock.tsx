import React from 'react'
import './MeetingBlock.css'

type Variant = 'tentative' | 'accepted'

type Props = {
  variant: Variant
  length: 15 | 30 | 60 | 120
  title: string
  roomInfo: string
  organizerInfo: string
  useRandomData: boolean
}

const HEIGHT_MAP: Record<number, number> = {
  15: 20,
  30: 40,
  60: 80,
  120: 160,
}

// Random data generators
const MEETING_TITLES = [
  'Team Standup',
  'Product Review',
  'Planning Session',
  'Design Review',
  'Client Meeting',
  'Sprint Retrospective',
  'Tech Sync',
  'One-on-One',
  'Workshop',
  'Q&A Session',
  'Code Review',
  'Strategy Discussion',
  'Demo Day',
  'All Hands',
  'Coffee Chat',
]

const ROOM_NAMES = [
  'Conference Room A',
  'Conference Room B',
  'Meeting Room 101',
  'Meeting Room 202',
  'Board Room',
  'Training Room',
  'Breakout Room 1',
  'Breakout Room 2',
  'Zoom Room',
  'Virtual',
  'Main Conference',
  'Small Conference',
]

const ORGANIZER_NAMES = [
  'John Smith',
  'Sarah Johnson',
  'Michael Chen',
  'Emily Davis',
  'David Wilson',
  'Lisa Anderson',
  'James Brown',
  'Maria Garcia',
  'Robert Taylor',
  'Jennifer Martinez',
  'William Lee',
  'Jessica White',
]

// Random data generation utilities
export function generateRandomTitle(): string {
  return MEETING_TITLES[Math.floor(Math.random() * MEETING_TITLES.length)]
}

export function generateRandomRoomInfo(): string {
  const room = ROOM_NAMES[Math.floor(Math.random() * ROOM_NAMES.length)]
  return room
}

export function generateRandomOrganizerInfo(): string {
  const organizer = ORGANIZER_NAMES[Math.floor(Math.random() * ORGANIZER_NAMES.length)]
  return organizer
}

export function generateRandomMeetingData() {
  return {
    title: generateRandomTitle(),
    roomInfo: generateRandomRoomInfo(),
    organizerInfo: generateRandomOrganizerInfo(),
  }
}

export default function MeetingBlock({ 
  variant = 'accepted', 
  length, 
  title, 
  roomInfo, 
  organizerInfo,
  useRandomData = false 
}: Props){
  const height = HEIGHT_MAP[length] || 40
  const className = `meeting-block ${variant}`

  // Generate random data if useRandomData is true
  const randomData = useRandomData ? generateRandomMeetingData() : null
  
  // Use provided props, or random data if useRandomData is true, or fallback for title
  const displayTitle = title || (randomData?.title) || (variant === 'accepted' ? 'Accepted' : 'Tentative')
  // Use prop if provided, otherwise use random data if useRandomData is true
  const displayRoomInfo = roomInfo !== undefined ? roomInfo : (useRandomData ? randomData?.roomInfo : undefined)
  const displayOrganizerInfo = organizerInfo !== undefined ? organizerInfo : (useRandomData ? randomData?.organizerInfo : undefined)

  return (
    <div className={className} style={{height}} aria-label={`meeting ${displayTitle}`}>
      <div className="meeting-content">
        <div className="meeting-title">{displayTitle}</div>
        {displayRoomInfo && <div className="meeting-room-info">{displayRoomInfo}</div>}
        {displayOrganizerInfo && <div className="meeting-organizer-info">{displayOrganizerInfo}</div>}
      </div>
    </div>
  )
}
