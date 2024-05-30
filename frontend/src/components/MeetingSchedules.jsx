import React from 'react'
import Layout from './Layout';
import MenteeRemarkCard from './MenteeRemarkCard';
import { Link } from 'react-router-dom';
function MeetingSchedules() {
  return (
    <Layout>
      <div className="">
        <div className="upcomingmeetings">
          <h1>upcomingmeetings</h1>
        <MenteeRemarkCard />
        </div>
        <hr/>
        <div className="pastmeetings">
          <h1>past meetings</h1>
          <Link to='/'><MenteeRemarkCard /></Link>
        </div>
      </div>
    </Layout>
  )
}

export default MeetingSchedules