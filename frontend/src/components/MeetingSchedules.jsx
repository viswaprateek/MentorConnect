import React from 'react';
import Layout from './Layout';
import MenteeRemarkCard from './MenteeRemarkCard';
import { Link } from 'react-router-dom';
import './MeetingSchedules.css'; 

function MeetingSchedules() {
  return (
    <Layout>
      <div className="meeting-schedules-container">
        <div className="upcoming-meetings">
          <h1>Upcoming Meetings</h1>
          <div className="cards-container">
            <MenteeRemarkCard />
            {/* Madhav add more MenteeRemarkCard components as needed */}
            <div className="new-meeting-card">
              <Link to='/schedule-new-meeting' className="new-meeting-link">
                <div className="plus-symbol">+</div>
              </Link>
            </div>
          </div>
        </div>
        <hr/>
        <div className="past-meetings">
          <h1>Past Meetings</h1>
          <div className="cards-container">
            <Link to='/' className="meeting-link">
              <MenteeRemarkCard />
            </Link>
            {/* Madhav u can add more Link-wrapped MenteeRemarkCard components as needed */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MeetingSchedules;
