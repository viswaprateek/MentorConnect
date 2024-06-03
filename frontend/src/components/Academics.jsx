import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { useParams } from 'react-router-dom';
import { getAcedamicsByUserId } from '../api'; // Make sure the path is correct
import { useMentee } from '../MenteeContext';

const Academics = () => {
  const { menteeId } = useMentee();
  const params = useParams();
  const [academicDetails, setAcademicDetails] = useState(null); // Use null for initial state
  console.log('Fetched academic details:', academicDetails);

  useEffect(() => {
    const fetchAcademicDetails = async () => {
      try {
        const response = await getAcedamicsByUserId(params.id);
        setAcademicDetails(response);
      } catch (error) {
        console.error('Error fetching academic details:', error);
      }
    };
    fetchAcademicDetails();
  }, [params.id]);

  if (!academicDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      {academicDetails.map((academicDetail, index) => (
        <div key={index}>
          <h1 className="mb-4">Academic Details</h1>
          <h2 className="mb-3">Mentee: {academicDetail.studentName}</h2>
          <h3>CGPA: {academicDetail.CGPA}</h3>
          <div>
            {academicDetail.results && academicDetail.results.map((result, resultIndex) => (
              <div key={resultIndex} className="mb-4">
                <h3 className="mb-3">Semester {result.semester}</h3>
                <h4 className="mb-2">Semester GPA: {result.semesterGPA}</h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Internal 1</th>
                      <th>Internal 2</th>
                      <th>Avg Internal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.subjects.map((subject, subIndex) => (
                      <tr key={subIndex}>
                        <td>{subject.subject}</td>
                        <td>{subject.internal1}</td>
                        <td>{subject.internal2}</td>
                        <td>{subject.avgInternal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default Academics;
