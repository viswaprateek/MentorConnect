import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { updateMeeting, deleteMeeting } from '../api';
import CompleteMeetingModal from './CompleteMeetingModal';
import './MeetingsList.css';

const MeetingsList = ({ meetings, onMeetingUpdated, onMeetingDeleted }) => {
  const { userRole } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMeetingId, setCurrentMeetingId] = useState(null);

  const handleCompleteMeeting = async (id, mom, remarks) => {
    try {
      const updatedMeeting = await updateMeeting(id, { mom, remarks, status: 'completed' });
      onMeetingUpdated(updatedMeeting);
    } catch (error) {
      console.error('Error completing meeting:', error);
    } finally {
      setModalOpen(false);
      setCurrentMeetingId(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMeeting(id);
      onMeetingDeleted(id);
    } catch (error) {
      console.error('Error deleting meeting:', error);
    }
  };

  const pastMeetings = meetings.filter((meeting) => meeting.status === 'completed');
  const upcomingMeetings = meetings.filter((meeting) => meeting.status === 'upcoming');

  return (
    <div className="meetings-list">
      <div className="meetings-row upcoming-meetings">
        <h2>Upcoming Meetings</h2>
        <div className="meetings-list">
          {upcomingMeetings.map((meeting) => (
            <div className="meeting-card" key={meeting._id}>
              <h3>{meeting.venue}</h3>
              <p>Date: {new Date(meeting.date).toLocaleDateString()}</p>
              <p>Time: {meeting.time}</p>
              <p>Status: {meeting.status}</p>
              {userRole === 'mentor' && (
                <div className="meeting-actions">
                  <button
                    className="complete-button"
                    onClick={() => {
                      setCurrentMeetingId(meeting._id);
                      setModalOpen(true);
                    }}
                  >
                    Complete
                  </button>
                  <button onClick={() => handleDelete(meeting._id)} className="btn-danger">
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="meetings-row past-meetings">
        <h2>Past Meetings</h2>
        <div className="meetings-list">
          {pastMeetings.map((meeting, index) => (
            <div className="meeting-card" key={meeting._id}>
              <h3>{meeting.venue}</h3>
              <p>Date: {new Date(meeting.date).toLocaleDateString()}</p>
              <p>Time: {meeting.time}</p>
              <p>Status: {meeting.status}</p>
              <p>MoM: {meeting.mom}</p>
              <p>Remarks: {meeting.remarks}</p>
            </div>
          ))}
        </div>
      </div>
      <CompleteMeetingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onComplete={(mom, remarks) => handleCompleteMeeting(currentMeetingId, mom, remarks)}
      />
    </div>
  );
};

export default MeetingsList;
