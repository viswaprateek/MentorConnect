import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAcedamicsByUserId } from '../api'; // Ensure the path is correct
import { useMentee } from '../MenteeContext';
import Layout from './Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const Academics = () => {
  const { menteeId } = useMentee();
  const params = useParams();
  const [academicDetails, setAcademicDetails] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcademicDetails = async () => {
      try {
        const response = await getAcedamicsByUserId(params.id);
        setAcademicDetails(response);
      } catch (error) {
        setError('Failed to fetch academic details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchAcademicDetails();
  }, [params.id]);

  const handleSemesterChange = (event) => {
    const semester = event.target.value;
    setSelectedSemester(semester);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container text-center mt-5">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </Layout>
    );
  }

  if (!academicDetails) {
    return (
      <Layout>
        <div className="container text-center mt-5">
          <p>No academic details available.</p>
        </div>
      </Layout>
    );
  }

  const selectedResult = academicDetails[0].results.find(
    (result) => result.semester.toString() === selectedSemester
  );

  return (
    <Layout>
      <div className="container py-5">
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Academic Details</h2>
            <h4 className="card-subtitle mb-2 text-muted">
              Mentee: {academicDetails[0].studentName}
            </h4>
            <h5 className="card-subtitle mb-4 text-muted">CGPA: {academicDetails[0].CGPA}</h5>

            <div className="mb-4">
              <label htmlFor="semester-select" className="form-label">
                Select Semester
              </label>
              <select
                id="semester-select"
                className="form-select"
                value={selectedSemester || ''}
                onChange={handleSemesterChange}
              >
                <option value="" disabled>
                  Choose a semester
                </option>
                {academicDetails[0].results.map((result, index) => (
                  <option key={index} value={result.semester}>
                    Semester {result.semester}
                  </option>
                ))}
              </select>
            </div>

            {selectedResult && (
              <div className="card mt-4">
                <div className="card-body">
                  <h5 className="card-title">Semester {selectedResult.semester}</h5>
                  <p className="card-text">Semester GPA: {selectedResult.semesterGPA}</p>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Internal 1</th>
                          <th>Internal 2</th>
                          <th>Avg Internal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedResult.subjects.map((subject, subIndex) => (
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Academics;
