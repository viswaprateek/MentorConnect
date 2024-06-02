import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { getMenteesByMentorAndYear } from '../api';
import MiniLayout from './MiniLayout';
import { useMentee } from '../MenteeContext';
import { useAuth } from '../AuthContext';
import { useInView } from 'react-intersection-observer';
import './MenteesList.css';

const MenteesList = () => {
  const { year } = useParams();
  const navigate = useNavigate();
  const { setMenteeId } = useMentee();
  const { userId: mentorId } = useAuth();
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <MiniLayout>
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" />
        </Container>
      </MiniLayout>
    );
  }

  return (
    <MiniLayout>
      <Container>
        {mentees.length === 0 ? (
          <h5 className="text-center my-5">No mentees present.</h5>
        ) : (
          <Row className="gy-4">
            {mentees.map((mentee) => (
              <Col key={mentee._id} xs={12} sm={6} md={4} lg={3}>
                <MenteeCard mentee={mentee} onClick={() => handleMenteeClick(mentee._id)} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </MiniLayout>
  );
};

const MenteeCard = ({ mentee, onClick }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      document.getElementById(mentee._id).classList.add('visible');
    }
  }, [inView, mentee._id]);

  return (
    <Card
      ref={ref}
      id={mentee._id}
      className={`fade-in ${inView ? 'visible' : ''} text-center shadow-sm`}
      onClick={onClick}
      style={{ cursor: 'pointer', borderRadius: '8px' }}
    >
      <Card.Img variant="top" src={mentee.photoLink} alt={`${mentee.name}'s profile`} style={{ height: '200px', objectFit: 'cover' }} />
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
