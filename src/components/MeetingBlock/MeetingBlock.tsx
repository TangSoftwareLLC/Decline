import React from 'react'
import './MeetingBlock.css'

type Variant = 'tentative' | 'accepted'

type Props = {
  variant: Variant
  length: 15 | 30 | 60 | 120
  title?: string
  roomInfo?: string
  organizerInfo?: string
}

export const HEIGHT_MAP: Record<number, number> = {
  15: 20,
  30: 40,
  60: 80,
  120: 160,
}

export const MEETING_LENGTHS = [15, 30, 60, 120] as const;

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
function generateRandomTitle(): string {
  return MEETING_TITLES[Math.floor(Math.random() * MEETING_TITLES.length)]
}

function generateRandomRoomInfo(): string {
  return ROOM_NAMES[Math.floor(Math.random() * ROOM_NAMES.length)]
}

function generateRandomOrganizerInfo(): string {
  return ORGANIZER_NAMES[Math.floor(Math.random() * ORGANIZER_NAMES.length)]
}

export default function MeetingBlock({ 
  variant = 'accepted', 
  length, 
  title, 
  roomInfo, 
  organizerInfo
}: Props){
  const height = HEIGHT_MAP[length] || 40
  const className = `meeting-block ${variant}`

  // Generate random values if props are not provided
  const displayTitle = title || generateRandomTitle()
  const displayRoomInfo = roomInfo || generateRandomRoomInfo()
  const displayOrganizerInfo = organizerInfo || generateRandomOrganizerInfo()

  return (
    <div className={className} style={{height}} aria-label={`meeting ${displayTitle}`}>
      <div className="meeting-content">
        <div className="meeting-title">{displayTitle}</div>
        {length !== 15 && (
          <>
            <div className="meeting-room-info">{displayRoomInfo}</div>
            <div className="meeting-organizer-info">{displayOrganizerInfo}</div>
          </>
        )}
      </div>
    </div>
  )
}
