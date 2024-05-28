import React, { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart';
import { useMentee } from '../MenteeContext'; // Importing useMentee to get menteeId
import { getAttendanceByUserId } from '../api'; // Importing the function from api.jsx
import Layout from './Layout';
import './Attendance.css'; // Import the CSS file

const Attendance = () => {
  const { menteeId } = useMentee();
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await getAttendanceByUserId(menteeId);
        setAttendanceData(data);
      } catch (error) {
        setError('Failed to fetch attendance data');
      } finally {
        setLoading(false);
      }
    };

    if (menteeId) {
      fetchAttendance();
    }
  }, [menteeId]);

  const sumClasses = (key) => {
    const keys = {
      attended: ['OSattended', 'COattended', 'DAAattended', 'SEattended', 'EEAattended', 'IPRattended', 'WADattended', 'SELABattended', 'OSLABattended', 'FPattended'],
      totalClasses: ['OStotalClasses', 'COtotalClasses', 'DAAtotalClasses', 'SEtotalClasses', 'EEAtotalClasses', 'IPRtotalClasses', 'WADtotalClasses', 'SELABtotalClasses', 'OSLABtotalClasses', 'FPtotalClasses']
    };
    return attendanceData.reduce((total, item) => {
      keys[key].forEach(k => total += (item[k] || 0));
      return total;
    }, 0);
  };

  const totalAttended = sumClasses('attended');
  const totalClasses = sumClasses('totalClasses');
  const attendancePercentage = totalClasses > 0 ? (totalAttended / totalClasses) * 100 : 0;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div className="attendance-container">
        <h3 className="attendance-percentage">Attendance Percentage: {attendancePercentage.toFixed(2)}%</h3>
        <div className="attendance-content">
          <div className="gauge-chart-container">
            <GaugeChart id="attendance-gauge"
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
      </div>
    </Layout>
  );
};

export default Attendance;