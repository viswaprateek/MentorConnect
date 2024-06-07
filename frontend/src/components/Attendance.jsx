import React, { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart';
import { useMentee } from '../MenteeContext'; // Importing useMentee to get menteeId
import { getAttendanceByUserId } from '../api'; // Importing the function from api.jsx
import Layout from './Layout';
import './Attendance.css'; // Import the CSS file
import { useParams } from 'react-router-dom';

const Attendance = () => {
  const params = useParams();
  const { menteeId } = useMentee();
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendancePercentage, setAttendancePercentage] = useState(0);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await getAttendanceByUserId(params.id);
        setAttendanceData(data);
        const totalAttended = sumClasses(data, 'attended');
        const totalClasses = sumClasses(data, 'totalClasses');
        const initialAttendancePercentage = totalClasses > 0 ? (totalAttended / totalClasses) * 100 : 0;
        setAttendancePercentage(initialAttendancePercentage);
      } catch (error) {
        setError('Failed to fetch attendance data');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAttendance();
    }
  }, [params.id]);

  const sumClasses = (data, key) => {
    const keys = {
      attended: ['OSattended', 'COattended', 'DAAattended', 'SEattended', 'EEAattended', 'IPRattended', 'WADattended', 'SELABattended', 'OSLABattended', 'FPattended'],
      totalClasses: ['OStotalClasses', 'COtotalClasses', 'DAAtotalClasses', 'SEtotalClasses', 'EEAtotalClasses', 'IPRtotalClasses', 'WADtotalClasses', 'SELABtotalClasses', 'OSLABtotalClasses', 'FPtotalClasses']
    };
    return data.reduce((total, item) => {
      keys[key].forEach(k => total += (item[k] || 0));
      return total;
    }, 0);
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();
    const diffDays = Math.ceil((selectedDate - currentDate) / (1000 * 60 * 60 * 24));

    if (selectedDate < currentDate) {
      alert('Improper date selected. Please select a future date.');
      return;
    }

    const totalAttended = sumClasses(attendanceData, 'attended');
    const totalClasses = sumClasses(attendanceData, 'totalClasses');
    const adjustedTotalAttended = totalAttended + (diffDays * 6);
    const adjustedTotalClasses = totalClasses + (diffDays * 6);
    const adjustedPercentage = adjustedTotalClasses > 0 ? (adjustedTotalAttended / adjustedTotalClasses) * 100 : 0;

    setSelectedDate(event.target.value);
    setAttendancePercentage(adjustedPercentage);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const totalAttended = sumClasses(attendanceData, 'attended');
  const totalClasses = sumClasses(attendanceData, 'totalClasses');
  const totalSemClasses = attendanceData.length > 0 ? attendanceData[0].TotalSemClasses : 0;
  const requiredClasses = totalSemClasses * 0.75;
  const classesNeeded = Math.max(0, requiredClasses - totalAttended);

  return (
    <Layout>
      <div className="attendance-container">
        <h3 className="attendance-percentage">Attendance Percentage: {attendancePercentage.toFixed(2)}%</h3>
        <div className="attendance-content">
          <div className="gauge-chart-container">
            <GaugeChart
              id="attendance-gauge"
              nrOfLevels={20}
              colors={["#FF0000", "#FFBB28", "#00FF00"]}
              arcWidth={0.3}
              percent={attendancePercentage / 100}
              textColor="#000000"
              formatTextValue={() => attendancePercentage.toFixed(2) + '%'}
            />
          </div>
          <div className="attendance-table-container">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Attended Classes</th>
                  <th>Total Classes</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>{item.OScode}</td>
                      <td>{item.OSattended}</td>
                      <td>{item.OStotalClasses}</td>
                    </tr>
                    <tr>
                      <td>{item.COcode}</td>
                      <td>{item.COattended}</td>
                      <td>{item.COtotalClasses}</td>
                    </tr>
                    <tr>
                      <td>{item.DAAcode}</td>
                      <td>{item.DAAattended}</td>
                      <td>{item.DAAtotalClasses}</td>
                    </tr>
                    <tr>
                      <td>{item.SEcode}</td>
                      <td>{item.SEattended}</td>
                      <td>{item.SEtotalClasses}</td>
                    </tr>
                    <tr>
                      <td>{item.EEAcode}</td>
                      <td>{item.EEAattended}</td>
                      <td>{item.EEAtotalClasses}</td>
                    </tr>
                    <tr>
                      <td>{item.IPRcode}</td>
                      <td>{item.IPRattended}</td>
                      <td>{item.IPRtotalClasses}</td>
                    </tr>
                    <tr>
                      <td>{item.WADcode}</td>
                      <td>{item.WADattended}</td>
                      <td>{item.WADtotalClasses}</td>
                    </tr>
                    <tr>
                      <td>{item.SELABcode}</td>
                      <td>{item.SELABattended}</td>
                      <td>{item.SELABtotalClasses}</td>
                    </tr>
                    <tr>
                      <td>{item.OSLABcode}</td>
                      <td>{item.OSLABattended}</td>
                      <td>{item.OSLABtotalClasses}</td>
                    </tr>
                    <tr>
                      <td>{item.FPcode}</td>
                      <td>{item.FPattended}</td>
                      <td>{item.FPtotalClasses}</td>
                    </tr>
                  </React.Fragment>
                ))}
                <tr>
                  <td><strong>Total</strong></td>
                  <td><strong>{totalAttended}</strong></td>
                  <td><strong>{totalClasses}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="classes-needed">
          {classesNeeded > 0
            ? <h5>You need to attend {classesNeeded} more classes to meet the 75% sem attendance requirement.</h5>
            : <p>No need to attend more classes. You have met the 75% attendance requirement.</p>}
        </div>
        <div className="date-input-container">
          <label htmlFor="date-input">Select a Date to which attendance percentage to be calculated: </label>
          <input
            type="date"
            id="date-input"
            value={selectedDate || ''}
            onChange={handleDateChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;