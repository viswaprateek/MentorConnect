import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Image, Badge } from 'react-bootstrap';
import { getMenteeById } from '../api';
import { useMentee } from '../MenteeContext';
import Layout from './Layout';
import { useParams } from 'react-router-dom';
import profilebanner from '../assets/profilebanner.png';

const MenteeDashboard = () => {
  const { id } = useParams();
  const { menteeId } = useMentee();
  const [mentee, setMentee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentee = async () => {
      try {
        const fetchedMentee = await getMenteeById(id);
        setMentee(fetchedMentee);
        setLoading(false);
      } catch (error) {
        console.error(`Failed to fetch mentee with ID ${menteeId}:`, error);
        setLoading(false);
      }
    };

    fetchMentee();
  }, [id]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (!mentee) {
    return <h6>Mentee not found</h6>;
  }

  return (
    <div className='bg-light'>
      <Layout>
        
        <Card className="mb-4 m-3" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <Image
              src={profilebanner}
              fluid
              style={{ width: '100%', height: '23vh', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}
            />
            <div
              style={{
                position: 'absolute',
                top: '10vh',
                right: '3rem',
                border: '5px solid white',
                borderRadius: '50%',
                padding: '5px',
                backgroundColor: 'white',
              }}
            >
              <Image
                src={mentee.photoLink}
                roundedCircle
                style={{ width: '9rem', height: '9rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
              />
            </div>
          </div>
          <Card.Body>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{mentee.name}</p>
            <p className="text-muted">{mentee.email}</p>
            <p className="text-muted">{mentee.class1}</p>
            <p className="text-muted">Roll Number: {mentee.registrationNumber}</p>
          </Card.Body>
        </Card>

        {/* New Card */}
        <Card className="mb-4 m-3" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Card.Body>
            <p style={{fontSize:'1.25rem',
              color:'rgb(126, 26, 26)',
              fontWeight:'bold'
            }}>Basic Info</p>
            <hr/>
            <Row>
              <Col md={6}>
                <p><strong>Father Name:</strong> {mentee.FatherName}</p>
                <p><strong>Mother Name:</strong> {mentee.MotherName}</p>
                <p><strong>Place of Birth:</strong> {mentee.PlaceOfBirth}</p>
                <p><strong>Religion:</strong> {mentee.Religion}</p>
                <p><strong>Join Type:</strong> {mentee.JoinType}</p>
                <p><strong>UID No:</strong> {mentee.UIDNo}</p>
                <p><strong>UID Enroll No:</strong> {mentee.UIDEnrollNo}</p>
              </Col>
              <Col md={6}>
                <p><strong>Gender:</strong> {mentee.Gender}</p>
                <p><strong>Date of Birth:</strong> {mentee.DOB}</p>
                <p><strong>Blood Group:</strong> {mentee.BloodGroup}</p>
                <p><strong>Nationality:</strong> {mentee.Nationality}</p>
                <p><strong>Date of Joining:</strong> {mentee.DOJ}</p>
                <p><strong>Parent Income:</strong> {mentee.ParentIncome}</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <p><strong>Caste Name:</strong> {mentee.CasteName}</p>
                <p><strong>DOR:</strong> {mentee.DOR}</p>
                <p><strong>Is PH:</strong> {mentee.IsPh ? 'Yes' : 'No'}</p>
                <p><strong>Is Lateral:</strong> {mentee.IsLateral ? 'Yes' : 'No'}</p>
              </Col>
              <Col md={6}>
                <p><strong>Relieve Type:</strong> {mentee.RelieveType}</p>
                <p><strong>Is Local:</strong> {mentee.IsLocal ? 'Yes' : 'No'}</p>
                <p><strong>Is EBC:</strong> {mentee.IsEbc ? 'Yes' : 'No'}</p>
                <p><strong>Is Minority:</strong> {mentee.IsMinority ? 'Yes' : 'No'}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Layout>
    </div>
  );
};

export default MenteeDashboard;
