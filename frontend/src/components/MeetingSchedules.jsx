import React from 'react'
import Layout from './Layout';
import MenteeRemarkCard from './MenteeRemarkCard';
function MeetingSchedules() {
  return (
    <Layout>
      <div className="">
        <div className="upcomingmeetings"></div>
        <hr/>
        <div className="pastmeetings">
          <MenteeRemarkCard>hi</MenteeRemarkCard>
        </div>
      </div>
    </Layout>
  )
}

export default MeetingSchedules