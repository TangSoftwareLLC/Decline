import React from 'react'
import { MeetingBlock } from './components'

export default function App(){
  return (
    <div className="container">
      <h1>Meeting Block - Component Library</h1>
      <p>Variants: <strong>accepted</strong>, <strong>tentative</strong>. Lengths: 15, 30, 60, 120 minutes.</p>

      <h2>Accepted</h2>
      <div className="examples">
        <MeetingBlock variant="accepted" length={15} title="Quick sync" roomInfo="Room 1" organizerInfo="John Doe"/>
        <MeetingBlock variant="accepted" length={30} title="Standup" roomInfo="Room 2" organizerInfo="Jane Doe"/>
        <MeetingBlock variant="accepted" length={60} title="Planning" roomInfo="Room 3" organizerInfo="Jim Doe"/>
        <MeetingBlock variant="accepted" length={120} title="Workshop" roomInfo="Room 4" organizerInfo="Jill Doe"/>
      </div>

      <h2 style={{marginTop:20}}>Tentative</h2>
      <div className="examples">
        <MeetingBlock variant="tentative" length={15} title="Maybe: sync" roomInfo="Room 5" organizerInfo="John Doe"/>
        <MeetingBlock variant="tentative" length={30} title="Maybe: demo" roomInfo="Room 6" organizerInfo="Jane Doe"/>
        <MeetingBlock variant="tentative" length={60} title="Maybe: review" roomInfo="Room 7" organizerInfo="Jim Doe"/>
        <MeetingBlock variant="tentative" length={120} title="Maybe: offsite" roomInfo="Room 8" organizerInfo="Jill Doe"/>
      </div>
    </div>
  )
}
