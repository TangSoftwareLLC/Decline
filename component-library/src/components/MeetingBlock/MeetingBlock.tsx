import React from 'react'
import './MeetingBlock.css'

type Variant = 'tentative' | 'accepted'

type Props = {
  variant?: Variant
  length: 15 | 30 | 60 | 120
  title?: string
}

const HEIGHT_MAP: Record<number, number> = {
  15: 20,
  30: 40,
  60: 80,
  120: 160,
}

export default function MeetingBlock({ variant = 'accepted', length, title }: Props){
  const height = HEIGHT_MAP[length] || 40
  const className = `meeting-block ${variant}`

  return (
    <div className={className} style={{height}} aria-label={`meeting ${title || ''}`}>
      <div className="meeting-content">
        <div className="meeting-title">{title || (variant === 'accepted' ? 'Accepted' : 'Tentative')}</div>
      </div>
    </div>
  )
}
