import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Spinner, Card } from 'react-bootstrap';
import { getMenteesByMentorAndYear } from '../api';
import MiniLayout from './MiniLayout';
import { useMentee } from '../MenteeContext';
import { useAuth } from '../AuthContext';
import './MenteesList.css';
 
const MenteesList = () => {
  const { year } = useParams();
  const navigate = useNavigate();
  const { setMenteeId } = useMentee();
  const { userId: mentorId } = useAuth();
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
 
  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const yearMentees = await getMenteesByMentorAndYear(mentorId, year);
        setMentees(yearMentees);
        setLoading(false);
      } catch (error) {
        console.error(`Failed to fetch mentees for mentor ${mentorId} and year ${year}:`, error);
        setLoading(false);
      }
    };
 
    if (mentorId && year) {
      fetchMentees();
    }
  }, [mentorId, year]);
 
  const handleMenteeClick = (menteeId) => {
    setMenteeId(menteeId);
    navigate(`/menteedashboard/${menteeId}`);
  };
 
  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };
 
  const handleNextClick = () => {
    setCurrentSlide((prevSlide) => Math.min(prevSlide + 1, Math.ceil(mentees.length / 3) - 1));
  };
 
  if (loading) {
    return (
      <MiniLayout>
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" />
        </Container>
      </MiniLayout>
    );
  }
 
  const displayedMentees = mentees.slice(currentSlide * 3, currentSlide * 3 + 3);
  const totalSlides = Math.ceil(mentees.length / 3);
 
  return (
    <MiniLayout>
      <Container>
        {mentees.length === 0 ? (
          <h5 className="text-center my-5">No mentees present.</h5>
        ) : (
          <>
            <div className="slider">
              <button onClick={handlePrevClick} disabled={currentSlide === 0} className="slider-button">
                &lt;
              </button>
              <div className="slider-container">
                {displayedMentees.map((mentee) => (
                  <div key={mentee._id} className="slider-item">
                    <MenteeCard mentee={mentee} onClick={() => handleMenteeClick(mentee._id)} />
                  </div>
                ))}
              </div>
              <button onClick={handleNextClick} disabled={currentSlide === totalSlides - 1} className="slider-button">
                &gt;
              </button>
            </div>
            <div className="slider-dots">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                ></span>
              ))}
            </div>
          </>
        )}
      </Container>
    </MiniLayout>
  );
};
 
const MenteeCard = ({ mentee, onClick }) => {
  return (
    <Card className="fade-in text-center shadow-sm mentee-card" onClick={onClick}>
      <Card.Img variant="top" src={mentee.photoLink} alt={`${mentee.name}'s profile`} className="mentee-card-img" />
      <Card.Body>
        <Card.Title>{mentee.name}</Card.Title>
        <Card.Text>Registration: {mentee.registrationNumber}</Card.Text>
        <Card.Text>Class: {mentee.class1}</Card.Text>
        <Card.Text>Phone: {mentee.phone}</Card.Text>
      </Card.Body>
    </Card>
  );
};
 
export default MenteesList;