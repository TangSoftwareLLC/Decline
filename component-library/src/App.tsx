import React from 'react'
import { MeetingBlock } from './components'

export default function App(){
  return (
    <div className="container">
      <h1>Meeting Block - Component Library</h1>
      <p>Variants: <strong>accepted</strong>, <strong>tentative</strong>. Lengths: 15, 30, 60, 120 minutes.</p>

      <h2>Accepted</h2>
      <div className="examples">
        <MeetingBlock variant="accepted" length={15} title="Quick sync" />
        <MeetingBlock variant="accepted" length={30} title="Standup" />
        <MeetingBlock variant="accepted" length={60} title="Planning" />
        <MeetingBlock variant="accepted" length={120} title="Workshop" />
      </div>

      <h2 style={{marginTop:20}}>Tentative</h2>
      <div className="examples">
        <MeetingBlock variant="tentative" length={15} title="Maybe: sync" />
        <MeetingBlock variant="tentative" length={30} title="Maybe: demo" />
        <MeetingBlock variant="tentative" length={60} title="Maybe: review" />
        <MeetingBlock variant="tentative" length={120} title="Maybe: offsite" />
      </div>
    </div>
  )
}
